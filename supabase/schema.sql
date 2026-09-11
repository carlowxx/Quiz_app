-- Nurse GO — esquema mínimo para produção.
-- Rode no SQL Editor do projeto Supabase (uma vez).
-- Auth: habilite Email (magic link) em Authentication > Providers.
-- Em Authentication > URL Configuration, adicione "nursego://auth/callback"
-- em Redirect URLs — sem isso o link mágico não volta pro app.

-- ─────────────────────────────────────────────────────────────
-- profiles: dados públicos do usuário
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  nome          text not null default 'Estudante',
  situacao      text default 'Estudando',
  instituicao   text default '',
  curso         text default '',
  av_cor        text default 'azul',
  av_simbolo    text default 'coracao',
  premium       boolean not null default false,
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "perfil visível a todos os logados"
  on public.profiles for select to authenticated using (true);

create policy "dono edita o próprio perfil"
  on public.profiles for insert to authenticated with check (auth.uid() = id);

create policy "dono atualiza o próprio perfil"
  on public.profiles for update to authenticated using (auth.uid() = id);

-- ─────────────────────────────────────────────────────────────
-- progress: estado de jogo espelhado da nuvem
-- ─────────────────────────────────────────────────────────────
create table if not exists public.progress (
  user_id       uuid primary key references auth.users (id) on delete cascade,
  xp            integer not null default 0,
  nivel         integer not null default 1,
  prog          integer not null default 0,
  streak        integer not null default 0,
  licoes        integer not null default 0,
  salvos        integer not null default 0,
  conquistas    text[] not null default '{}',
  ultimo        date,
  -- economia: moedas, roupas possuídas e o que está equipado (jaleco/chapéu/acessório/pet)
  moedas        integer not null default 0,
  itens         text[] not null default '{}',
  equipado      jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now()
);

alter table public.progress enable row level security;

create policy "dono lê o próprio progresso"
  on public.progress for select to authenticated using (auth.uid() = user_id);

create policy "dono grava o próprio progresso"
  on public.progress for insert to authenticated with check (auth.uid() = user_id);

create policy "dono atualiza o próprio progresso"
  on public.progress for update to authenticated using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- answers: log de respostas (analytics de funil / dificuldade real)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.answers (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users (id) on delete cascade,
  questao    text not null,
  tema       text,
  nivel      integer,
  modo       text,
  correta    boolean not null,
  ms         integer,
  criado_em  timestamptz not null default now()
);

alter table public.answers enable row level security;

create policy "dono insere as próprias respostas"
  on public.answers for insert to authenticated with check (auth.uid() = user_id);

create policy "dono lê as próprias respostas"
  on public.answers for select to authenticated using (auth.uid() = user_id);

create index if not exists answers_user_idx on public.answers (user_id, criado_em desc);

-- ─────────────────────────────────────────────────────────────
-- achievements: conquistas desbloqueadas (feed social futuro)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.achievements (
  user_id     uuid not null references auth.users (id) on delete cascade,
  conquista   text not null,
  criado_em   timestamptz not null default now(),
  primary key (user_id, conquista)
);

alter table public.achievements enable row level security;

create policy "conquistas visíveis a todos os logados"
  on public.achievements for select to authenticated using (true);

create policy "dono insere as próprias conquistas"
  on public.achievements for insert to authenticated with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- leaderboard_weekly: liga semanal por XP
-- ─────────────────────────────────────────────────────────────
create table if not exists public.leaderboard_weekly (
  user_id      uuid not null references auth.users (id) on delete cascade,
  semana       date not null,
  nome         text not null,
  pontos       integer not null default 0,
  instituicao  text,
  atualizado_em timestamptz not null default now(),
  primary key (user_id, semana)
);

alter table public.leaderboard_weekly enable row level security;

create policy "ranking visível a todos os logados"
  on public.leaderboard_weekly for select to authenticated using (true);

create policy "dono grava a própria linha"
  on public.leaderboard_weekly for insert to authenticated with check (auth.uid() = user_id);

create policy "dono atualiza a própria linha"
  on public.leaderboard_weekly for update to authenticated using (auth.uid() = user_id);

create index if not exists leaderboard_semana_idx
  on public.leaderboard_weekly (semana, pontos desc);

-- ─────────────────────────────────────────────────────────────
-- cria profile + progress automaticamente ao registrar
-- ─────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nome)
    values (new.id, coalesce(new.raw_user_meta_data ->> 'name', 'Estudante'))
    on conflict (id) do nothing;
  insert into public.progress (user_id) values (new.id)
    on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
