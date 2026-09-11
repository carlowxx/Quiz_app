// Constantes de jogo do Nurse GO. Portadas do protótipo (Nurse GO.dc.html).

export const CHAVE = "nursego_v1";

export const NIVEIS: Record<number, string> = { 1: "Base", 2: "Intermediário", 3: "Avançado" };

export type TipoSegmento = "rodada" | "emergencia" | "bau" | "bonus";
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
  { tipo: "rodada", k: "misto", nome: "Misto", fg: "#fff" },
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
    icone: "icons/map.svg",
    cor: "#1B6FD1",
    tag: "A trilha",
    titulo: "Um passo de cada vez",
    texto:
      "A trilha é o coração do app. Cada casa é uma atividade curta: lições de 4 questões, checkpoints de revisão, roletas e o teste geral no fim. Você só abre a próxima casa depois de passar na anterior.",
  },
  {
    icone: "icons/lightbulb.svg",
    cor: "#1B6FD1",
    tag: "Dicas",
    titulo: "Você tem 2 dicas por lição",
    texto:
      "Travou numa questão? A dica do professor aponta o caminho sem entregar a resposta. Cada dica custa 15 XP do que você acumulou na rodada, então guarde para quando realmente precisar. Nas roletas e checkpoints você tem só 1.",
  },
  {
    icone: "icons/zap.svg",
    cor: "#F2994A",
    tag: "Energia",
    titulo: "Cada atividade consome energia",
    texto:
      "Você começa com 5 de energia. Lições e checkpoints custam 1, casos de emergência e o teste geral custam 2. A energia volta sozinha: 1 a cada 20 minutos. Baús e o plano Plus devolvem energia na hora.",
  },
  {
    icone: "icons/life-buoy.svg",
    cor: "#C2415A",
    tag: "Roleta",
    titulo: "A roleta decide o que vem",
    texto:
      "Em algumas casas você gira a roleta em vez de fazer uma lição. Pode cair uma rodada relâmpago de um sistema, um bônus com XP em dobro, um baú de recompensa ou uma emergência.",
  },
  {
    icone: "icons/heart-pulse.svg",
    cor: "#C2415A",
    tag: "Emergência",
    titulo: "Vida ou morte",
    texto:
      "Nos casos de emergência você conduz um paciente real do plantão, passo a passo. Cada conduta errada tira vida dele, e o dano varia com a gravidade do erro. Se a vida chegar a zero, o paciente evolui a óbito e a rodada não vale XP.",
  },
  {
    icone: "icons/sparkles.svg",
    cor: "#05A67A",
    tag: "Progresso",
    titulo: "XP, ofensiva e conquistas",
    texto:
      "Cada acerto rende XP, e responder rápido rende mais. Jogar todo dia mantém a ofensiva viva. Ao longo do caminho você desbloqueia conquistas, e todo erro vai para a Revisão com a explicação completa.",
  },
];

export interface AvatarCor {
  id: string;
  bg: string;
  solid: string;
}

export const AV_CORES: AvatarCor[] = [
  { id: "azul", bg: "linear-gradient(135deg,#1B6FD1,#3FA0E8)", solid: "#1B6FD1" },
  { id: "verde", bg: "linear-gradient(135deg,#05A67A,#2FC79A)", solid: "#05A67A" },
  { id: "vermelho", bg: "linear-gradient(135deg,#C2415A,#E8735C)", solid: "#C2415A" },
  { id: "ambar", bg: "linear-gradient(135deg,#E08A1E,#F2C24A)", solid: "#E08A1E" },
  { id: "noite", bg: "linear-gradient(135deg,#0A2540,#274B6B)", solid: "#0A2540" },
  { id: "roxo", bg: "linear-gradient(135deg,#6B4FCF,#9A7BEA)", solid: "#6B4FCF" },
];

export interface AvatarSimbolo {
  id: string;
  src: string;
}

export const AV_SIMBOLOS: AvatarSimbolo[] = [
  { id: "coracao", src: "icons/heart-pulse.svg" },
  { id: "pulmao", src: "icons/wind.svg" },
  { id: "raio", src: "icons/zap.svg" },
  { id: "estrela", src: "icons/star.svg" },
  { id: "medalha", src: "icons/award.svg" },
  { id: "brilho", src: "icons/sparkles.svg" },
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
  { id: "inicio", icone: "icons/book-open.svg", nome: "Primeiro passo", desc: "Concluir a primeira lição", xp: 50 },
  { id: "perfeita", icone: "icons/circle-check-big.svg", nome: "Lição perfeita", desc: "Acertar tudo em uma lição", xp: 80 },
  { id: "check", icone: "icons/list-checks.svg", nome: "Memória boa", desc: "Passar em um checkpoint", xp: 100 },
  { id: "cardio", icone: "icons/heart-pulse.svg", nome: "Coração firme", desc: "Concluir a unidade 1", xp: 200 },
  { id: "resp", icone: "icons/wind.svg", nome: "Fôlego longo", desc: "Concluir a unidade 2", xp: 200 },
  { id: "ofensiva", icone: "icons/flame.svg", nome: "Três dias seguidos", desc: "Manter ofensiva de 3 dias", xp: 120 },
  { id: "relampago", icone: "icons/zap.svg", nome: "Relâmpago", desc: "Vencer uma rodada da roleta", xp: 90 },
  { id: "salvador", icone: "icons/award.svg", nome: "Plantão sem perdas", desc: "Salvar um paciente na emergência", xp: 250 },
  { id: "geral", icone: "icons/trophy.svg", nome: "Visão geral", desc: "Passar no teste geral", xp: 300 },
];

/** ritmo padrão (props do protótipo, agora fixos) */
export const TEMPO_QUESTAO = 30;
export const META_SEMANAL = 5;
