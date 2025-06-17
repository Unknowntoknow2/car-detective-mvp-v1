// lib/auth.ts

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
