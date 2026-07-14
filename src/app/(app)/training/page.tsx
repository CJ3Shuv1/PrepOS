import { createClient } from "@/lib/supabase/server";
import TrainingView from "./TrainingView";
import type { Exercise, TrainingDay } from "@/lib/types";

export default async function TrainingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: days }, { data: exercises }] = await Promise.all([
    supabase
      .from("training_days")
      .select("*")
      .eq("user_id", user!.id)
      .order("position", { ascending: true }),
    supabase
      .from("exercises")
      .select("*")
      .eq("user_id", user!.id)
      .order("position", { ascending: true }),
  ]);

  return (
    <TrainingView
      days={(days || []) as TrainingDay[]}
      exercises={(exercises || []) as Exercise[]}
    />
  );
}
