import { createClient } from "@/lib/supabase/server";
import CheckinForm from "./CheckinForm";
import type { Checkin, WeightEntry } from "@/lib/types";

export default async function CheckinPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: checkins }, { data: weights }] = await Promise.all([
    supabase
      .from("checkins")
      .select("*")
      .eq("user_id", user!.id)
      .order("date", { ascending: false })
      .limit(10),
    supabase.from("weight_log").select("*").eq("user_id", user!.id).order("date", { ascending: false }).limit(10),
  ]);

  return (
    <CheckinForm
      recentCheckins={(checkins || []) as Checkin[]}
      recentWeights={(weights || []) as WeightEntry[]}
    />
  );
}
