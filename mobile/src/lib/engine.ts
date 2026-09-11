// Regras puras do Nurse GO — sem React, sem RN/DOM. Portado de Nurse GO.dc.html.

import {
  CONQUISTAS,
  ENERGIA_MAX,
  ENERGIA_MIN,
  NIVEIS_JOGADOR,
  PETS,
  UNIDADES,
  type Conquista,
  type PetDef,
} from "@/data/constants";
import type { No, Perfil } from "./types";

export function hojeISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ontemISO(): string {
  return new Date(Date.now() - 864e5).toISOString().slice(0, 10);
}

/** segunda-feira da semana atual (YYYY-MM-DD) */
export function segunda(): string {
  const d = new Date();
  const dia = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dia);
  return d.toISOString().slice(0, 10);
}

export function energiaAgora(p: Perfil | null): number {
  if (!p) return ENERGIA_MAX;
  if (p.premium) return ENERGIA_MAX;
  const base = typeof p.energia === "number" ? p.energia : ENERGIA_MAX;
  if (base >= ENERGIA_MAX) return ENERGIA_MAX;
  const decorrido = Date.now() - (p.energiaTs || Date.now());
  return Math.min(ENERGIA_MAX, base + Math.floor(decorrido / (ENERGIA_MIN * 60000)));
}

export function proximaRecarga(p: Perfil | null): number {
  if (!p || p.premium) return 0;
  if (energiaAgora(p) >= ENERGIA_MAX) return 0;
  const decorrido = Date.now() - (p.energiaTs || Date.now());
  return ENERGIA_MIN * 60000 - (decorrido % (ENERGIA_MIN * 60000));
}

export function boostAtivo(p: Perfil | null): boolean {
  return !!(p && p.boostAte && p.boostAte > Date.now());
}

export function novoPerfil(nome: string, nivel: number, prog: number): Perfil {
  return {
    nome: (nome || "").trim() || "Estudante",
    nivel,
    prog: prog || 0,
    xp: 0,
    streak: 0,
    ultimo: null,
    ranking: [],
    erros: [],
    licoes: 0,
    conquistas: [],
    semana: { ini: segunda(), n: 0 },
    energia: ENERGIA_MAX,
    energiaTs: Date.now(),
    premium: false,
    foto: null,
    boostAte: 0,
    salvos: 0,
    avCor: "azul",
    avSimbolo: "coracao",
    instituicao: "",
    curso: "",
    situacao: "Estudando",
    moedas: 0,
    itens: ["jaleco-branco"],
    equipado: { jaleco: "jaleco-branco", pet: "pintinho" },
  };
}

/** nível de jogador (Estagiário → Mestre da Saúde), derivado do XP total */
export function nivelJogador(xp: number): FaixaNivel_ {
  let atual = NIVEIS_JOGADOR[0];
  for (const f of NIVEIS_JOGADOR) if (xp >= f.xpMin) atual = f;
  return atual;
}
type FaixaNivel_ = (typeof NIVEIS_JOGADOR)[number];

/** pets já desbloqueados pelo nível de jogador atual */
export function petsDesbloqueados(nivelJog: number): PetDef[] {
  return PETS.filter((p) => nivelJog >= p.nivelMinimo);
}

/** monta a lista linear de casas da trilha */
export function nos(): No[] {
  const lista: No[] = [];
  let g = 0;
  UNIDADES.forEach((u, ui) => {
    u.licoes.forEach((nome, li) => {
      lista.push({ tipo: "licao", ui, k: u.k, li, i: g++, rotulo: nome, cor: u.cor });
      if (li === 0) lista.push({ tipo: "roleta", ui, k: u.k, i: g++, rotulo: "Girar a roleta", cor: "#F2994A" });
      if (li === 1) lista.push({ tipo: "check", ui, k: u.k, ate: 2, i: g++, rotulo: "O que vimos até aqui", cor: "#0A2540" });
      if (li === 2) lista.push({ tipo: "roleta", ui, k: u.k, i: g++, rotulo: "Girar a roleta", cor: "#F2994A" });
      if (li === 3) lista.push({ tipo: "check", ui, k: u.k, ate: 4, i: g++, rotulo: "O que vimos até aqui", cor: "#0A2540" });
    });
    lista.push({ tipo: "check", ui, k: u.k, ate: 5, i: g++, rotulo: "Revisão da unidade", cor: "#0A2540" });
    lista.push({ tipo: "roleta", ui, k: u.k, i: g++, rotulo: "Girar a roleta", cor: "#F2994A" });
    lista.push({ tipo: "bau", ui, k: u.k, i: g++, rotulo: "Baú de recompensa", cor: "#F2C24A" });
  });
  lista.push({ tipo: "geral", ui: 1, k: "misto", i: g++, rotulo: "Show do Milhão da Saúde", cor: "#0A2540" });
  return lista;
}

/** credita conquistas ainda não obtidas; muta `p` e devolve as novas */
export function premiar(p: Perfil, ids: Array<string | null | false>): Conquista[] {
  const ganhas: Conquista[] = [];
  ids.filter(Boolean).forEach((id) => {
    if ((p.conquistas || []).includes(id as string)) return;
    const c = CONQUISTAS.find((x) => x.id === id);
    if (!c) return;
    p.conquistas = (p.conquistas || []).concat([id as string]);
    p.xp = (p.xp || 0) + c.xp;
    ganhas.push(c);
  });
  return ganhas;
}

export function embaralhar<T>(arr: T[]): T[] {
  return arr.slice().sort(() => Math.random() - 0.5);
}
