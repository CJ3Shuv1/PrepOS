import { createClient } from "@/lib/supabase/server";
import type { MealItem } from "@/lib/types";

function sumMacros(items: MealItem[]) {
  return items.reduce(
    (acc, i) => ({
      kcal: acc.kcal + (i.kcal ?? 0),
      carbs: acc.carbs + (i.carbs ?? 0),
      fett: acc.fett + (i.fett ?? 0),
      protein: acc.protein + (i.protein ?? 0),
    }),
    { kcal: 0, carbs: 0, fett: 0, protein: 0 }
  );
}

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

  const mealItems = (items || []) as MealItem[];
  const mealNumbers = [...new Set(mealItems.map((i) => i.meal_number))].sort((a, b) => a - b);

  if (mealNumbers.length === 0) {
    return (
      <div>
        <h1 className="mb-1 text-3xl font-extrabold tracking-tight">Ernährungsplan</h1>
        <p className="mb-5 text-sm text-[var(--text-dim)]">Noch kein Plan hinterlegt.</p>
        <div className="panel rounded-2xl p-5 text-sm text-[var(--text-faint)]">
          Dein Coach trägt deinen Ernährungsplan ein — schau bald wieder vorbei.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-1 text-3xl font-extrabold tracking-tight">Ernährungsplan</h1>
      <p className="mb-5 text-sm text-[var(--text-dim)]">
        {mealNumbers.length} Mahlzeiten — mit Alternative je Mahlzeit.
      </p>

      <div className="space-y-4">
        {mealNumbers.map((num) => {
          const primary = mealItems.filter((i) => i.meal_number === num && i.variant === "primary");
          const alternative = mealItems.filter((i) => i.meal_number === num && i.variant === "alternative");
          const primaryTotal = sumMacros(primary);
          const altTotal = sumMacros(alternative);

          return (
            <div key={num} className="panel rounded-3xl p-5">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]">
                Meal {num}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <MealVariant title="Standard" items={primary} total={primaryTotal} />
                {alternative.length > 0 && (
                  <MealVariant title="Alternative" items={alternative} total={altTotal} muted />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MealVariant({
  title,
  items,
  total,
  muted,
}: {
  title: string;
  items: MealItem[];
  total: { kcal: number; carbs: number; fett: number; protein: number };
  muted?: boolean;
}) {
  return (
    <div>
      <div
        className={`mb-2 font-mono text-[10px] uppercase tracking-[0.08em] ${muted ? "text-[var(--text-faint)]" : "text-[var(--text-dim)]"}`}
      >
        {title}
      </div>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b border-[var(--panel-border)] py-1.5 text-[13px] last:border-none">
          <span>{item.food_name}</span>
          <span className="font-mono text-[var(--text-faint)]">
            {item.amount}
            {item.unit}
          </span>
        </div>
      ))}
      <div className="mt-2 font-mono text-[11px] font-semibold text-[var(--text-dim)]">
        {Math.round(total.kcal)} kcal · {Math.round(total.carbs)}C · {Math.round(total.fett)}F ·{" "}
        {Math.round(total.protein)}P
      </div>
    </div>
  );
}
