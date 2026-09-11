// Cliente Supabase — opcional. Enquanto NEXT_PUBLIC_SUPABASE_URL /
// NEXT_PUBLIC_SUPABASE_ANON_KEY não existirem, o app roda 100% local
// (localStorage) e nenhuma função de nuvem é chamada.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const nuvemAtiva = Boolean(url && anon);

let _client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  if (!nuvemAtiva) return null;
  if (!_client) {
    _client = createClient(url as string, anon as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _client;
}
