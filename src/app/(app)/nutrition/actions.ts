"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { MealItem } from "@/lib/types";
import { MAX_DEMO_MEALS } from "@/lib/constants";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");
  return { supabase, user };
}

export async function addMeal() {
  const { supabase, user } = await requireUser();
  const { data: existing } = await supabase
    .from("meal_items")
    .select("meal_number")
    .eq("user_id", user.id)
    .order("meal_number", { ascending: false })
    .limit(1);
  const nextMeal = (existing?.[0]?.meal_number ?? 0) + 1;
  if (nextMeal > MAX_DEMO_MEALS) return nextMeal;

  await supabase.from("meal_items").insert({
    user_id: user.id,
    meal_number: nextMeal,
    variant: "primary",
    food_name: "Neue Zutat",
    amount: 0,
    unit: "g",
    kcal: 0,
    carbs: 0,
    fett: 0,
    protein: 0,
    fiber: 0,
    position: 0,
  });
  revalidatePath("/nutrition");
  return nextMeal;
}

export async function addMealItem(mealNumber: number, variant: "primary" | "alternative") {
  const { supabase, user } = await requireUser();
  const { count } = await supabase
    .from("meal_items")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("meal_number", mealNumber)
    .eq("variant", variant);

  await supabase.from("meal_items").insert({
    user_id: user.id,
    meal_number: mealNumber,
    variant,
    food_name: "Neue Zutat",
    amount: 0,
    unit: "g",
    kcal: 0,
    carbs: 0,
    fett: 0,
    protein: 0,
    fiber: 0,
    position: count ?? 0,
  });
  revalidatePath("/nutrition");
}

type MealItemPatch = Partial<
  Pick<MealItem, "food_name" | "amount" | "unit" | "kcal" | "carbs" | "fett" | "protein" | "fiber">
>;

export async function updateMealItem(id: string, patch: MealItemPatch) {
  const { supabase, user } = await requireUser();
  await supabase.from("meal_items").update(patch).eq("id", id).eq("user_id", user.id);
  revalidatePath("/nutrition");
}

export async function deleteMealItem(id: string) {
  const { supabase, user } = await requireUser();
  await supabase.from("meal_items").delete().eq("id", id).eq("user_id", user.id);
  revalidatePath("/nutrition");
}

export async function deleteMeal(mealNumber: number) {
  const { supabase, user } = await requireUser();
  await supabase
    .from("meal_items")
    .delete()
    .eq("user_id", user.id)
    .eq("meal_number", mealNumber);
  revalidatePath("/nutrition");
}
