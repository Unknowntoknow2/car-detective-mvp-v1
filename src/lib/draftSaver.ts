// lib/draftSaver.ts

import { supabase } from "./auth";

export async function saveDraft(userId: string, formData: any) {
  const { error } = await supabase
    .from("drafts")
    .upsert({ user_id: userId, data: formData });

  if (error) throw error;
}

export async function loadDraft(userId: string) {
  const { data, error } = await supabase
    .from("drafts")
    .select("data")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data?.data;
}
