"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MealItem } from "@/lib/types";
import { addMeal, addMealItem, deleteMeal, deleteMealItem, updateMealItem } from "./actions";
import PremiumTeaser from "../PremiumTeaser";

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

const UNITS = ["g", "ml", "Stück", "EL", "TL"];

export default function NutritionView({ items }: { items: MealItem[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const mealNumbers = [...new Set(items.map((i) => i.meal_number))].sort((a, b) => a - b);
  const refresh = () => router.refresh();

  return (
    <div>
      <div className="mb-1 flex items-start justify-between gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Ernährungsplan</h1>
        <button
          onClick={() => setEditing((e) => !e)}
          className={`shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold ${
            editing ? "bg-[var(--accent)] text-white" : "panel text-[var(--text-dim)]"
          }`}
        >
          {editing ? "Fertig" : "Bearbeiten"}
        </button>
      </div>
      <p className="mb-5 text-sm text-[var(--text-dim)]">
        {mealNumbers.length > 0 ? `${mealNumbers.length} Mahlzeiten — mit Alternative je Mahlzeit.` : "Noch kein Plan hinterlegt."}
      </p>

      <div className="space-y-4">
        {mealNumbers.map((num) => {
          const primary = items.filter((i) => i.meal_number === num && i.variant === "primary");
          const alternative = items.filter((i) => i.meal_number === num && i.variant === "alternative");

          return (
            <div key={num} className="panel rounded-3xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]">
                  Meal {num}
                </div>
                {editing && (
                  <button
                    onClick={async () => {
                      if (confirm(`Meal ${num} komplett löschen?`)) {
                        await deleteMeal(num);
                        refresh();
                      }
                    }}
                    className="font-mono text-[10px] text-[var(--text-faint)] underline"
                  >
                    Meal löschen
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <MealVariant
                  title="Standard"
                  items={primary}
                  mealNumber={num}
                  variant="primary"
                  editing={editing}
                  onChanged={refresh}
                />
                <MealVariant
                  title="Alternative"
                  items={alternative}
                  mealNumber={num}
                  variant="alternative"
                  editing={editing}
                  onChanged={refresh}
                  muted
                />
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <button
          onClick={async () => {
            await addMeal();
            refresh();
          }}
          className="mt-4 w-full rounded-2xl border border-dashed border-[var(--panel-border)] p-3.5 text-sm text-[var(--text-faint)]"
        >
          + Meal hinzufügen
        </button>
      )}

      <div className="mt-4">
        <PremiumTeaser
          title="KI-Ernährungsanalyse"
          description="Beschreib, was du gegessen hast — die KI schätzt Kalorien & Makros automatisch."
        >
          <textarea
            readOnly
            value="z.B. 200g Hähnchenbrust, 150g Reis, 1 EL Olivenöl..."
            className="mb-2 h-16 w-full resize-none rounded-xl bg-white/70 p-2.5 text-xs outline-none"
          />
          <div className="w-full rounded-xl bg-[var(--accent)] py-2.5 text-center text-xs font-bold text-white">
            Analysieren
          </div>
        </PremiumTeaser>
      </div>
    </div>
  );
}

function MealVariant({
  title,
  items,
  mealNumber,
  variant,
  editing,
  onChanged,
  muted,
}: {
  title: string;
  items: MealItem[];
  mealNumber: number;
  variant: "primary" | "alternative";
  editing: boolean;
  onChanged: () => void;
  muted?: boolean;
}) {
  const total = sumMacros(items);

  return (
    <div>
      <div
        className={`mb-2 font-mono text-[10px] uppercase tracking-[0.08em] ${muted ? "text-[var(--text-faint)]" : "text-[var(--text-dim)]"}`}
      >
        {title}
      </div>
      {items.map((item) =>
        editing ? (
          <EditableItemRow key={item.id} item={item} onChanged={onChanged} />
        ) : (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-[var(--panel-border)] py-1.5 text-[13px] last:border-none"
          >
            <span>{item.food_name}</span>
            <span className="font-mono text-[var(--text-faint)]">
              {item.amount} {item.unit}
            </span>
          </div>
        )
      )}
      {editing && (
        <button
          onClick={() => addMealItem(mealNumber, variant).then(onChanged)}
          className="mt-1.5 w-full rounded-lg border border-dashed border-[var(--panel-border)] py-1.5 text-[11px] text-[var(--text-faint)]"
        >
          + Zutat
        </button>
      )}
      <div className="mt-2 font-mono text-[11px] font-semibold text-[var(--text-dim)]">
        {Math.round(total.kcal)} kcal · {Math.round(total.carbs)}C · {Math.round(total.fett)}F ·{" "}
        {Math.round(total.protein)}P
      </div>
    </div>
  );
}

function EditableItemRow({ item, onChanged }: { item: MealItem; onChanged: () => void }) {
  const [name, setName] = useState(item.food_name);
  const [amount, setAmount] = useState(item.amount ?? 0);
  const [unit, setUnit] = useState(item.unit ?? "g");
  const [kcal, setKcal] = useState(item.kcal ?? 0);
  const [carbs, setCarbs] = useState(item.carbs ?? 0);
  const [fett, setFett] = useState(item.fett ?? 0);
  const [protein, setProtein] = useState(item.protein ?? 0);

  async function commit(patch: Record<string, unknown>) {
    await updateMealItem(item.id, patch);
    onChanged();
  }

  return (
    <div className="panel-raised mb-1.5 rounded-lg p-2">
      <div className="mb-1.5 flex items-center gap-1.5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => name !== item.food_name && commit({ food_name: name })}
          className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          onBlur={() => commit({ amount })}
          className="w-14 shrink-0 rounded bg-white/60 px-1 py-0.5 text-center text-[12px] outline-none"
        />
        <select
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
            commit({ unit: e.target.value });
          }}
          className="shrink-0 rounded bg-white/60 px-1 py-0.5 text-[11px] outline-none"
        >
          {UNITS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <button onClick={() => deleteMealItem(item.id).then(onChanged)} className="shrink-0 text-[var(--text-faint)]">
          ✕
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1">
        <MicroField label="kcal" value={kcal} onChange={setKcal} onBlur={() => commit({ kcal })} />
        <MicroField label="C" value={carbs} onChange={setCarbs} onBlur={() => commit({ carbs })} />
        <MicroField label="F" value={fett} onChange={setFett} onBlur={() => commit({ fett })} />
        <MicroField label="P" value={protein} onChange={setProtein} onBlur={() => commit({ protein })} />
      </div>
    </div>
  );
}

function MicroField({
  label,
  value,
  onChange,
  onBlur,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  onBlur: () => void;
}) {
  return (
    <label className="block">
      <span className="block text-center font-mono text-[8px] uppercase text-[var(--text-faint)]">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        onBlur={onBlur}
        className="w-full rounded bg-white/60 px-1 py-0.5 text-center text-[11px] outline-none"
      />
    </label>
  );
}
