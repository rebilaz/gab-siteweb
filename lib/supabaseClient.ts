import { createClient } from "@supabase/supabase-js";

let singletonClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseServerClient() {
  if (singletonClient) {
    return singletonClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  singletonClient = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  return singletonClient;
}
