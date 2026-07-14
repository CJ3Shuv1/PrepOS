"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");
  return { supabase, user };
}

export async function saveCheckin(formData: FormData) {
  const { supabase, user } = await requireUser();

  const date = String(formData.get("date") || "");
  if (!date) return;

  const num = (key: string) => {
    const v = formData.get(key);
    if (v === null || v === "") return null;
    const n = parseFloat(String(v));
    return Number.isNaN(n) ? null : n;
  };

  const weight = num("weight");
  if (weight !== null) {
    await supabase
      .from("weight_log")
      .upsert({ user_id: user.id, date, weight }, { onConflict: "user_id,date" });
  }

  await supabase.from("checkins").upsert(
    {
      user_id: user.id,
      date,
      sleep_hours: num("sleep_hours"),
      sleep_quality: num("sleep_quality"),
      energy_level: num("energy_level"),
      stress_level: num("stress_level"),
      hunger: num("hunger"),
      digestion: num("digestion"),
      steps: num("steps"),
      cardio_minutes: num("cardio_minutes"),
      soreness: num("soreness"),
      notes: (formData.get("notes") as string) || null,
    },
    { onConflict: "user_id,date" }
  );

  revalidatePath("/checkin");
  revalidatePath("/dashboard");
}
