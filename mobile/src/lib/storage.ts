import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHAVE } from "@/data/constants";
import type { Perfil } from "./types";
import { hojeISO, ontemISO } from "./engine";

export async function carregarPerfil(): Promise<Perfil | null> {
  let raw: string | null = null;
  try {
    raw = await AsyncStorage.getItem(CHAVE);
  } catch {
    return null;
  }
  if (!raw) return null;
  let p: Perfil | null = null;
  try {
    p = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!p) return null;
  // ofensiva quebra se o último dia jogado não é hoje nem ontem
  if (p.ultimo && p.ultimo !== hojeISO() && p.ultimo !== ontemISO()) p.streak = 0;
  return p;
}

export async function salvarPerfil(p: Perfil): Promise<void> {
  try {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(p));
  } catch {
    // storage bloqueado — segue sem persistir
  }
}

export async function limparPerfil(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CHAVE);
  } catch {
    /* noop */
  }
}
