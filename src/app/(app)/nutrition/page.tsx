import { createClient } from "@/lib/supabase/server";
import NutritionView from "./NutritionView";
import type { MealItem } from "@/lib/types";

export default async function NutritionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: items } = await supabase
    .from("meal_items")
    .select("*")
    .eq("user_id", user!.id)
    .order("meal_number", { ascending: true })
    .order("position", { ascending: true });

  return <NutritionView items={(items || []) as MealItem[]} />;
}
