import { createClient } from "@supabase/supabase-js";

// Use env vars for real projects!
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);
