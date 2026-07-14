"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Exercise } from "@/lib/types";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");
  return { supabase, user };
}

export async function addDay(label: string, sub: string) {
  const { supabase, user } = await requireUser();
  const { count } = await supabase
    .from("training_days")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);
  await supabase.from("training_days").insert({
    user_id: user.id,
    key: "day_" + Date.now(),
    label: label || "Neuer Tag",
    sub: sub || null,
    position: count ?? 0,
  });
  revalidatePath("/training");
}

export async function deleteDay(dayId: string) {
  const { supabase, user } = await requireUser();
  await supabase.from("training_days").delete().eq("id", dayId).eq("user_id", user.id);
  revalidatePath("/training");
}

export async function addExercise(dayId: string) {
  const { supabase, user } = await requireUser();
  const { count } = await supabase
    .from("exercises")
    .select("id", { count: "exact", head: true })
    .eq("day_id", dayId);
  await supabase.from("exercises").insert({
    user_id: user.id,
    day_id: dayId,
    name: "Neue Übung",
    sets: 3,
    rep_range: "8-10",
    tempo: null,
    intensity: null,
    notes: "",
    position: count ?? 0,
  });
  revalidatePath("/training");
}

type ExercisePatch = Partial<
  Pick<Exercise, "name" | "sets" | "rep_range" | "tempo" | "intensity" | "notes">
>;

export async function updateExercise(exerciseId: string, patch: ExercisePatch) {
  const { supabase, user } = await requireUser();
  await supabase.from("exercises").update(patch).eq("id", exerciseId).eq("user_id", user.id);
  revalidatePath("/training");
}

export async function deleteExercise(exerciseId: string) {
  const { supabase, user } = await requireUser();
  await supabase.from("exercises").delete().eq("id", exerciseId).eq("user_id", user.id);
  revalidatePath("/training");
}
