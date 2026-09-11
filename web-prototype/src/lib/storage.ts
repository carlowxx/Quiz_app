import { CHAVE } from "@/data/constants";
import type { Perfil } from "./types";
import { hojeISO, ontemISO } from "./engine";

export function carregarPerfil(): Perfil | null {
  if (typeof window === "undefined") return null;
  let p: Perfil | null = null;
  try {
    p = JSON.parse(localStorage.getItem(CHAVE) || "null");
  } catch {
    return null;
  }
  if (!p) return null;
  // ofensiva quebra se o último dia jogado não é hoje nem ontem
  if (p.ultimo && p.ultimo !== hojeISO() && p.ultimo !== ontemISO()) p.streak = 0;
  return p;
}

export function salvarPerfil(p: Perfil): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(p));
  } catch {
    // storage cheio ou bloqueado — segue sem persistir
  }
}

export function limparPerfil(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    /* noop */
  }
}
