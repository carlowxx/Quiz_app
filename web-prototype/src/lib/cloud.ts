// Sincronização de nuvem (dormente sem Supabase configurado).
//
// Estratégia: o localStorage continua sendo a fonte da verdade offline.
// Quando há sessão logada, o perfil é espelhado em `progress` e as melhores
// rodadas alimentam `leaderboard_weekly`. Conflitos resolvidos por
// "maior XP vence" no merge (simples e suficiente para v1).

import { nuvemAtiva, supabase } from "./supabase";
import { segunda } from "./engine";
import type { Perfil } from "./types";

export async function usuarioAtual() {
  const sb = supabase();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data.user ?? null;
}

export async function entrarComEmail(email: string) {
  const sb = supabase();
  if (!sb) throw new Error("nuvem indisponível");
  return sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
  });
}

export async function entrarComGoogle() {
  const sb = supabase();
  if (!sb) throw new Error("nuvem indisponível");
  return sb.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
  });
}

export async function sair() {
  const sb = supabase();
  if (sb) await sb.auth.signOut();
}

/** Envia o perfil local para a nuvem (upsert em profiles + progress). */
export async function enviarPerfil(p: Perfil): Promise<void> {
  const sb = supabase();
  if (!sb) return;
  const user = await usuarioAtual();
  if (!user) return;

  await sb.from("profiles").upsert({
    id: user.id,
    nome: p.nome,
    situacao: p.situacao,
    instituicao: p.instituicao,
    curso: p.curso,
    av_cor: p.avCor,
    av_simbolo: p.avSimbolo,
    premium: p.premium,
    atualizado_em: new Date().toISOString(),
  });

  await sb.from("progress").upsert({
    user_id: user.id,
    xp: p.xp,
    nivel: p.nivel,
    prog: p.prog,
    streak: p.streak,
    licoes: p.licoes,
    salvos: p.salvos,
    conquistas: p.conquistas,
    ultimo: p.ultimo,
    atualizado_em: new Date().toISOString(),
  });

  const melhor = [...(p.ranking || [])].sort((a, b) => b.pontos - a.pontos)[0];
  if (melhor && melhor.pontos > 0) {
    await sb.from("leaderboard_weekly").upsert(
      {
        user_id: user.id,
        semana: segunda(),
        nome: p.nome,
        pontos: melhor.pontos,
        instituicao: p.instituicao || null,
      },
      { onConflict: "user_id,semana" }
    );
  }
}

/** Puxa o progresso da nuvem e devolve um merge sobre o perfil local. */
export async function baixarPerfil(local: Perfil): Promise<Perfil> {
  const sb = supabase();
  if (!sb) return local;
  const user = await usuarioAtual();
  if (!user) return local;

  const { data } = await sb.from("progress").select("*").eq("user_id", user.id).maybeSingle();
  if (!data) return local;
  if ((data.xp ?? 0) <= local.xp) return local; // local está à frente

  return {
    ...local,
    xp: data.xp ?? local.xp,
    nivel: data.nivel ?? local.nivel,
    prog: Math.max(local.prog, data.prog ?? 0),
    streak: data.streak ?? local.streak,
    licoes: Math.max(local.licoes, data.licoes ?? 0),
    salvos: Math.max(local.salvos, data.salvos ?? 0),
    conquistas: Array.from(new Set([...(local.conquistas || []), ...(data.conquistas || [])])),
    ultimo: data.ultimo ?? local.ultimo,
  };
}

export interface LinhaRanking {
  nome: string;
  pontos: number;
  instituicao: string | null;
}

export async function rankingSemana(): Promise<LinhaRanking[]> {
  const sb = supabase();
  if (!sb) return [];
  const { data } = await sb
    .from("leaderboard_weekly")
    .select("nome, pontos, instituicao")
    .eq("semana", segunda())
    .order("pontos", { ascending: false })
    .limit(50);
  return (data as LinhaRanking[]) ?? [];
}

export { nuvemAtiva };
