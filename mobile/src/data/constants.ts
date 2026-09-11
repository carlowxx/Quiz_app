// Constantes de jogo do Nurse GO. Portadas do protótipo (Nurse GO.dc.html).
// Ícones aqui são nomes do conjunto Lucide (ver components/Icon.tsx), não
// caminhos de arquivo — o app nativo usa lucide-react-native.

export const CHAVE = "nursego_v1";

export const NIVEIS: Record<number, string> = { 1: "Base", 2: "Intermediário", 3: "Avançado" };

export type TipoSegmento = "rodada" | "emergencia" | "bau" | "bonus" | "item";
export interface Segmento {
  tipo: TipoSegmento;
  k: "cardio" | "resp" | "misto" | "emerg";
  nome: string;
  fg: string;
}

export const SEGS: Segmento[] = [
  { tipo: "rodada", k: "cardio", nome: "Cardio", fg: "#fff" },
  { tipo: "emergencia", k: "emerg", nome: "Emergência", fg: "#fff" },
  { tipo: "rodada", k: "resp", nome: "Respiratório", fg: "#0A2540" },
  { tipo: "bau", k: "misto", nome: "Baú", fg: "#fff" },
  { tipo: "item", k: "misto", nome: "Item", fg: "#fff" },
  { tipo: "bonus", k: "misto", nome: "Bônus x2", fg: "#fff" },
];

export interface Unidade {
  k: "cardio" | "resp";
  tag: string;
  nome: string;
  cor: string;
  licoes: string[];
}

export const UNIDADES: Unidade[] = [
  {
    k: "cardio",
    tag: "Unidade 1",
    nome: "Sistema cardiovascular",
    cor: "#1B6FD1",
    licoes: [
      "Anatomia do coração",
      "Ritmo e eletrocardiograma",
      "Ciclo cardíaco e bulhas",
      "Hemodinâmica",
      "Eletrofisiologia e pressão",
    ],
  },
  {
    k: "resp",
    tag: "Unidade 2",
    nome: "Sistema respiratório",
    cor: "#05A67A",
    licoes: [
      "Vias aéreas e alvéolos",
      "Mecânica e controle",
      "Pressões e pleura",
      "Volumes e quimiorreceptores",
      "Trocas gasosas",
    ],
  },
];

export interface PassoTutorial {
  icone: string;
  cor: string;
  tag: string;
  titulo: string;
  texto: string;
}

export const TUTORIAL: PassoTutorial[] = [
  {
    icone: "Map",
    cor: "#1B6FD1",
    tag: "A trilha",
    titulo: "Um passo de cada vez",
    texto:
      "A trilha é o coração do app. Cada casa é uma atividade curta: lições de 4 questões, checkpoints de revisão, roletas e o teste geral no fim. Você só abre a próxima casa depois de passar na anterior.",
  },
  {
    icone: "Lightbulb",
    cor: "#1B6FD1",
    tag: "Dicas",
    titulo: "Você tem 2 dicas por lição",
    texto:
      "Travou numa questão? A dica do professor aponta o caminho sem entregar a resposta. Cada dica custa 15 XP do que você acumulou na rodada, então guarde para quando realmente precisar. Nas roletas e checkpoints você tem só 1.",
  },
  {
    icone: "Zap",
    cor: "#F2994A",
    tag: "Energia",
    titulo: "Cada atividade consome energia",
    texto:
      "Você começa com 5 de energia. Lições e checkpoints custam 1, casos de emergência e o teste geral custam 2. A energia volta sozinha: 1 a cada 20 minutos. Baús e o plano Plus devolvem energia na hora.",
  },
  {
    icone: "LifeBuoy",
    cor: "#C2415A",
    tag: "Roleta",
    titulo: "A roleta decide o que vem",
    texto:
      "Em algumas casas você gira a roleta em vez de fazer uma lição. Pode cair uma rodada relâmpago de um sistema, um bônus com XP em dobro, um baú de recompensa ou uma emergência.",
  },
  {
    icone: "HeartPulse",
    cor: "#C2415A",
    tag: "Emergência",
    titulo: "Vida ou morte",
    texto:
      "Nos casos de emergência você conduz um paciente real do plantão, passo a passo. Cada conduta errada tira vida dele, e o dano varia com a gravidade do erro. Se a vida chegar a zero, o paciente evolui a óbito e a rodada não vale XP.",
  },
  {
    icone: "Sparkles",
    cor: "#05A67A",
    tag: "Progresso",
    titulo: "XP, ofensiva e conquistas",
    texto:
      "Cada acerto rende XP, e responder rápido rende mais. Jogar todo dia mantém a ofensiva viva. Ao longo do caminho você desbloqueia conquistas, e todo erro vai para a Revisão com a explicação completa.",
  },
];

export interface AvatarCor {
  id: string;
  bg: [string, string]; // par de cores do degradê
  solid: string;
}

export const AV_CORES: AvatarCor[] = [
  { id: "azul", bg: ["#1B6FD1", "#3FA0E8"], solid: "#1B6FD1" },
  { id: "verde", bg: ["#05A67A", "#2FC79A"], solid: "#05A67A" },
  { id: "vermelho", bg: ["#C2415A", "#E8735C"], solid: "#C2415A" },
  { id: "ambar", bg: ["#E08A1E", "#F2C24A"], solid: "#E08A1E" },
  { id: "noite", bg: ["#0A2540", "#274B6B"], solid: "#0A2540" },
  { id: "roxo", bg: ["#6B4FCF", "#9A7BEA"], solid: "#6B4FCF" },
];

export interface AvatarSimbolo {
  id: string;
  icone: string;
}

export const AV_SIMBOLOS: AvatarSimbolo[] = [
  { id: "coracao", icone: "HeartPulse" },
  { id: "pulmao", icone: "Wind" },
  { id: "raio", icone: "Zap" },
  { id: "estrela", icone: "Star" },
  { id: "medalha", icone: "Award" },
  { id: "brilho", icone: "Sparkles" },
];

export const SITUACOES = ["Estudando", "Formado", "Concursando", "Residência"];

export const PREMIOS = [150, 300, 600, 1000, 1600, 2500, 4000, 6000, 9000, 15000];
export const SEGUROS = [3, 6];

export const ENERGIA_MAX = 5;
/** minutos para recuperar 1 de energia */
export const ENERGIA_MIN = 20;

export const CUSTO: Record<string, number> = {
  licao: 1,
  check: 1,
  relampago: 1,
  geral: 2,
  caso: 2,
};

export interface Conquista {
  id: string;
  icone: string;
  nome: string;
  desc: string;
  xp: number;
}

export const CONQUISTAS: Conquista[] = [
  { id: "inicio", icone: "BookOpen", nome: "Primeiro passo", desc: "Concluir a primeira lição", xp: 50 },
  { id: "perfeita", icone: "CircleCheckBig", nome: "Lição perfeita", desc: "Acertar tudo em uma lição", xp: 80 },
  { id: "check", icone: "ListChecks", nome: "Memória boa", desc: "Passar em um checkpoint", xp: 100 },
  { id: "cardio", icone: "HeartPulse", nome: "Coração firme", desc: "Concluir a unidade 1", xp: 200 },
  { id: "resp", icone: "Wind", nome: "Fôlego longo", desc: "Concluir a unidade 2", xp: 200 },
  { id: "ofensiva", icone: "Flame", nome: "Três dias seguidos", desc: "Manter ofensiva de 3 dias", xp: 120 },
  { id: "relampago", icone: "Zap", nome: "Relâmpago", desc: "Vencer uma rodada da roleta", xp: 90 },
  { id: "salvador", icone: "Award", nome: "Plantão sem perdas", desc: "Salvar um paciente na emergência", xp: 250 },
  { id: "geral", icone: "Trophy", nome: "Visão geral", desc: "Passar no teste geral", xp: 300 },
];

/** ritmo padrão (props do protótipo, agora fixos) */
export const TEMPO_QUESTAO = 30;
export const META_SEMANAL = 5;

// ─────────────────────────────────────────────────────────────
// Economia: moedas, nível de jogador, pets e roupas.
// Visual ainda é placeholder (cor + ícone Lucide) até termos arte
// própria do mascote — ver README > "Mascote e personalização".
// ─────────────────────────────────────────────────────────────

/** % do XP de cada rodada que também vira moeda */
export const MOEDAS_POR_XP = 0.1;

export interface FaixaNivel {
  nivel: number;
  xpMin: number;
  nome: string;
}

/** nível de jogador — derivado do XP total, separado do "nivel" de nivelamento */
export const NIVEIS_JOGADOR: FaixaNivel[] = [
  { nivel: 1, xpMin: 0, nome: "Estagiário" },
  { nivel: 2, xpMin: 500, nome: "Auxiliar" },
  { nivel: 3, xpMin: 1500, nome: "Técnico" },
  { nivel: 4, xpMin: 3500, nome: "Enfermeiro Jr." },
  { nivel: 5, xpMin: 7000, nome: "Enfermeiro" },
  { nivel: 6, xpMin: 12000, nome: "Enfermeiro Sr." },
  { nivel: 7, xpMin: 20000, nome: "Especialista" },
  { nivel: 8, xpMin: 35000, nome: "Mestre da Saúde" },
];

export interface PetDef {
  id: string;
  nome: string;
  nivelMinimo: number;
  icone: string;
  cor: string;
}

export const PETS: PetDef[] = [
  { id: "pintinho", nome: "Pimpolho", nivelMinimo: 1, icone: "Bird", cor: "#F2C24A" },
  { id: "gato", nome: "Bisturi", nivelMinimo: 2, icone: "Cat", cor: "#6B4FCF" },
  { id: "cachorro", nome: "Plantão", nivelMinimo: 3, icone: "Dog", cor: "#E08A1E" },
  { id: "coelho", nome: "Curativo", nivelMinimo: 4, icone: "Rabbit", cor: "#E8735C" },
  { id: "tartaruga", nome: "Vovó", nivelMinimo: 5, icone: "Turtle", cor: "#05A67A" },
  { id: "peixe", nome: "Soro", nivelMinimo: 6, icone: "Fish", cor: "#1B6FD1" },
  { id: "esquilo", nome: "Cafeína", nivelMinimo: 7, icone: "Squirrel", cor: "#B96A16" },
  { id: "coruja", nome: "Noturno", nivelMinimo: 8, icone: "Bird", cor: "#0A2540" },
];

export type SlotItem = "jaleco" | "chapeu" | "acessorio";
export type Raridade = "comum" | "raro" | "epico" | "legendario";

export const COR_RARIDADE: Record<Raridade, string> = {
  comum: "#8FA3AE",
  raro: "#1B6FD1",
  epico: "#6B4FCF",
  legendario: "#F2994A",
};

export const NOME_RARIDADE: Record<Raridade, string> = {
  comum: "Comum",
  raro: "Raro",
  epico: "Épico",
  legendario: "Legendário",
};

export interface Cosmetico {
  id: string;
  slot: SlotItem;
  nome: string;
  raridade: Raridade;
  /** preço em moedas na loja; null = não é vendido, só roleta */
  precoMoedas: number | null;
  icone: string;
  cor: string;
}

export const COSMETICOS: Cosmetico[] = [
  { id: "jaleco-branco", slot: "jaleco", nome: "Jaleco branco", raridade: "comum", precoMoedas: 0, icone: "Shirt", cor: "#F5F8F9" },
  { id: "jaleco-azul", slot: "jaleco", nome: "Jaleco azul", raridade: "comum", precoMoedas: 40, icone: "Shirt", cor: "#1B6FD1" },
  { id: "jaleco-verde", slot: "jaleco", nome: "Jaleco verde-cirúrgico", raridade: "raro", precoMoedas: 90, icone: "Shirt", cor: "#05A67A" },
  { id: "jaleco-dourado", slot: "jaleco", nome: "Jaleco dourado", raridade: "legendario", precoMoedas: null, icone: "Shirt", cor: "#F2C24A" },

  { id: "touca-descartavel", slot: "chapeu", nome: "Touca descartável", raridade: "comum", precoMoedas: 20, icone: "CircleDot", cor: "#DCE6EA" },
  { id: "gorro-cirurgico", slot: "chapeu", nome: "Gorro cirúrgico estampado", raridade: "raro", precoMoedas: 70, icone: "CircleDot", cor: "#C2415A" },
  { id: "toca-noturna", slot: "chapeu", nome: "Touca de plantão noturno", raridade: "epico", precoMoedas: null, icone: "CircleDot", cor: "#0A2540" },

  { id: "estetoscopio", slot: "acessorio", nome: "Estetoscópio", raridade: "comum", precoMoedas: 30, icone: "Stethoscope", cor: "#5A7383" },
  { id: "cracha", slot: "acessorio", nome: "Crachá de plantão", raridade: "raro", precoMoedas: 60, icone: "IdCard", cor: "#F2994A" },
  { id: "oculos", slot: "acessorio", nome: "Óculos de proteção", raridade: "raro", precoMoedas: 60, icone: "Glasses", cor: "#1B6FD1" },
  { id: "medalha-ouro", slot: "acessorio", nome: "Medalha de honra", raridade: "legendario", precoMoedas: null, icone: "Medal", cor: "#F2C24A" },
];
