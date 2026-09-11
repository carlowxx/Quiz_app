import type { Questao, TemaQuestao } from "@/data/banco";
import type { Caso, PassoCaso } from "@/data/casos";

export interface RankingItem {
  nome: string;
  pontos: number;
  rot: string;
  acertos: number;
  total: number;
  data: string; // YYYY-MM-DD
}

/** erro guardado para a tela de revisão */
export interface ErroSalvo {
  q: string;
  sua: string;
  certa: string;
  exp: string;
  t: TemaQuestao;
}

export interface Semana {
  ini: string; // segunda-feira YYYY-MM-DD
  n: number;
}

export interface Equipado {
  jaleco?: string;
  chapeu?: string;
  acessorio?: string;
  pet?: string;
}

export interface Perfil {
  nome: string;
  nivel: number;
  prog: number;
  xp: number;
  streak: number;
  ultimo: string | null;
  ranking: RankingItem[];
  erros: ErroSalvo[];
  licoes: number;
  conquistas: string[];
  semana: Semana;
  energia: number;
  energiaTs: number;
  premium: boolean;
  foto: string | null;
  boostAte: number;
  salvos: number;
  avCor: string;
  avSimbolo: string;
  instituicao: string;
  curso: string;
  situacao: string;
  /** moeda gasta na loja — separada do XP, que é progresso puro */
  moedas: number;
  /** ids de Cosmetico já obtidos (compra ou roleta) */
  itens: string[];
  equipado: Equipado;
}

export type Tela =
  | "boas"
  | "tutorial"
  | "mapa"
  | "quiz"
  | "roleta"
  | "bau"
  | "energia"
  | "fim"
  | "perfil"
  | "avatar"
  | "revisao"
  | "loja";

export type Modo = "licao" | "nivel" | "check" | "geral" | "milhao" | "relampago" | "caso";

export type TipoNo = "licao" | "roleta" | "check" | "bau" | "geral" | "caso";

export interface No {
  tipo: TipoNo;
  ui: number;
  k: "cardio" | "resp" | "misto";
  i: number;
  rotulo: string;
  cor: string;
  li?: number;
  ate?: number;
  ci?: number;
}

export interface ErroRodada {
  q: Questao | PassoCaso;
  sua: string;
}

export interface Estado {
  tela: Tela;
  perfil: Perfil | null;
  nomeInput: string;
  modo: Modo;
  fila: Array<Questao | PassoCaso>;
  idx: number;
  escolha: number | null;
  dica: boolean;
  dicas: number;
  bonus: boolean;
  xpRodada: number;
  acertos: number;
  tempo: number;
  errosRodada: ErroRodada[];
  noAtual: No | null;
  ultimoGanho: number;
  girando: boolean;
  wheelDeg: number;
  sorteado: import("@/data/constants").Segmento | null;
  fimTag: string;
  fimTitulo: string;
  fimTexto: string;
  novas: import("@/data/constants").Conquista[];
  fimObito: boolean;
  caso: Caso | null;
  vidas: number;
  obito: boolean;
  tutIdx: number;
  cartas: number;
  plateia: number;
  eliminadas: number[];
  pesquisa: number[] | null;
  parou: boolean;
  bauAberto: boolean;
  bauValor: number;
  /** o que a casa/roleta do baú entrega ao abrir: XP+energia, ou uma roupa */
  bauTipo: "xp" | "item";
  bauItem: import("@/data/constants").Cosmetico | null;
}
