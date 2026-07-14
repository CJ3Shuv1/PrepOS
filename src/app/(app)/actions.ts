"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { UiStyle } from "@/lib/types";

export async function setUiStyle(style: UiStyle) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("user_settings")
    .upsert({ user_id: user.id, ui_style: style, updated_at: new Date().toISOString() });

  revalidatePath("/", "layout");
}
