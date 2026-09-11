# Nurse GO

App **nativo** (Expo / React Native) de estudo de enfermagem em
português: trilha gamificada de fisiologia e anatomia dos sistemas
**cardiovascular** e **respiratório** (referência de mecânica:
Duolingo; referência de tensão: Show do Milhão), mais casos de
emergência. Público: estudantes de graduação em enfermagem, técnicos,
candidatos a concurso/COREN e enfermeiros em reciclagem.

Cores: verde `#05A67A`, azul `#1B6FD1`, azul-tinta `#0A2540`, branco
`#F5F8F9`, âmbar `#F2C24A`/`#F2994A`, vermelho `#C2415A` (emergência).
Tipografia: Bricolage Grotesque (títulos) + Public Sans (texto).

## Estrutura do repositório

```
mobile/          ← O APP. Expo + React Native + TypeScript.
                   npm install && npx expo start
supabase/        schema.sql — backend opcional (auth, progresso, ranking)
_prototype/      protótipo original em Claude Design (Nurse GO.dc.html)
web-prototype/   primeira tentativa em Next.js/PWA — arquivada, não é
                 mais o produto (decidimos app nativo, não web)
```

`mobile/` é o projeto ativo. Veja `mobile/README.md` para rodar,
configurar a nuvem e publicar nas lojas.

## Decisões já tomadas, não reabrir

- **App nativo** via Expo/React Native (não PWA/web) — build de loja
  real (Play Store / App Store), sem WebView.
- Mobile apenas.
- Dificuldade adaptativa dentro das lições e crescente ao longo da trilha.
- Emergência entra pela roleta, não como unidade separada.
- Energia como limitador, com plano pago removendo o limite.
- Avatar montável (cor × símbolo) com foto opcional, não avatar ilustrado.
- Sem emoji na interface; ícones sempre do conjunto Lucide
  (`lucide-react-native` no app nativo).
- Backend opcional e dormente: o app funciona 100% offline
  (AsyncStorage); Supabase liga login, progresso na nuvem e ranking
  semanal só quando configurado.

## Estado atual

Telas implementadas (porte 1:1 do protótipo): boas-vindas, tutorial,
nivelamento, trilha/mapa, lição, checkpoint, roleta, caso de
emergência, Show do Milhão da Saúde, baú, resultado, energia/paywall,
perfil, editor de avatar, revisão de erros.

Sistemas: trilha com 2 unidades e 25 casas; nivelamento de 6 questões;
roleta de 6 segmentos; emergência com barra de vida do paciente; Show
do Milhão com 10 degraus, pontos seguros, ajudas (cartas, plateia,
parar); energia com recarga automática e paywall simulado; XP,
ofensiva diária, meta semanal, 9 conquistas, ranking local, revisão de
erros.

Conteúdo: 40 questões objetivas (20 cardio + 20 respiratório) e 3 casos
de emergência (PCR, IAM, crise asmática) — ver pendências abaixo.

## O que falta para produção

### 1. Conteúdo (bloqueante)
Todas as questões, dicas, explicações e casos foram escritos com apoio
de IA e **ainda não passaram por revisão de um enfermeiro**. Antes de
lançar: revisão técnica item por item; ampliar para pelo menos 150
questões por sistema; mais casos de emergência (choque, sepse, AVC,
intoxicação, trauma); referência bibliográfica por questão.

### 2. Lojas (bloqueante para distribuição)
Builds via EAS (`mobile/README.md` tem os comandos). Precisa de conta
Expo, Google Play Console (US$ 25) e Apple Developer Program (US$
99/ano) — contas do usuário, não algo que se provisiona por aqui.

### 3. Contas e nuvem
Esquema Postgres com RLS já existe (`supabase/schema.sql`), incluindo
moedas/itens/equipado da economia de personalização, e o app já tem a
tela de login por e-mail (link mágico) e a sincronização de perfil —
tudo dormente até existir um projeto Supabase de verdade. Falta só:
criar o projeto, rodar o schema, habilitar o provider de e-mail e
colar a URL/anon key no `.env` (passo a passo em `mobile/README.md`).
Login Google fica para uma v2 (precisa de `expo-auth-session` +
esquema nativo registrado nas lojas).

### 4. Interação entre colegas
Ainda não implementada. Escopo desejado: liga semanal por XP (a tabela
`leaderboard_weekly` já sustenta isso), perfis visíveis com
instituição, desafio direto entre dois usuários e feed de conquistas.

### 5. Arte
Ícone do app e splash ainda são os padrões do Expo (placeholder).
Faltam: ícone definitivo, mascote em três estados (neutro, comemorando,
luto), ilustrações de topo das unidades.

### 6. Monetização
A tela do Nurse GO Plus existe mas não processa pagamento. Falta
integrar `react-native-iap`/RevenueCat (compra recorrente nas lojas),
definir preço final e decidir o que fica atrás do paywall além da
energia ilimitada.

### 7. Qualidade
Faltam testes, analytics de funil, e política de privacidade — o app
coleta nome, foto e instituição, e o login por e-mail passa dados para
o Supabase quando a nuvem está ativa.
