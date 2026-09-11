// Cliente Supabase — opcional. Enquanto EXPO_PUBLIC_SUPABASE_URL /
// EXPO_PUBLIC_SUPABASE_ANON_KEY não existirem, o app roda 100% local
// (AsyncStorage) e nenhuma função de nuvem é chamada.

import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const nuvemAtiva = Boolean(url && anon);

let _client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  if (!nuvemAtiva) return null;
  if (!_client) {
    _client = createClient(url as string, anon as string, {
      auth: {
        storage: AsyncStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return _client;
}
