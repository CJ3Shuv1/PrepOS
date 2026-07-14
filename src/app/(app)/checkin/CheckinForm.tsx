"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Checkin, WeightEntry } from "@/lib/types";
import { saveCheckin } from "./actions";
import PremiumTeaser from "../PremiumTeaser";

function todayLocal() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

const RATING_FIELDS: { key: string; label: string; emoji: string }[] = [
  { key: "sleep_quality", label: "Schlafqualität", emoji: "😴" },
  { key: "energy_level", label: "Energielevel", emoji: "⚡" },
  { key: "stress_level", label: "Stresslevel", emoji: "🧠" },
  { key: "hunger", label: "Hunger", emoji: "🍽" },
  { key: "digestion", label: "Verdauung", emoji: "💩" },
  { key: "soreness", label: "Muskelkater", emoji: "💪" },
];

export default function CheckinForm({
  recentCheckins,
  recentWeights,
}: {
  recentCheckins: Checkin[];
  recentWeights: WeightEntry[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>(
    Object.fromEntries(RATING_FIELDS.map((f) => [f.key, 5]))
  );

  const weightByDate = new Map(recentWeights.map((w) => [w.date, w.weight]));

  return (
    <div>
      <h1 className="mb-1 text-3xl font-extrabold tracking-tight">Check-in</h1>
      <p className="mb-5 text-sm text-[var(--text-dim)]">Wie lief&apos;s? Ein kurzer Check reicht.</p>

      <form
        action={async (formData) => {
          setSaving(true);
          await saveCheckin(formData);
          setSaving(false);
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
          router.refresh();
        }}
        className="panel mb-6 rounded-3xl p-5"
      >
        <div className="mb-4 grid grid-cols-2 gap-2.5">
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
              Datum
            </span>
            <input
              type="date"
              name="date"
              defaultValue={todayLocal()}
              className="panel-raised w-full rounded-xl px-3 py-2.5 text-sm outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
              Gewicht (kg)
            </span>
            <input
              type="number"
              step="0.1"
              name="weight"
              className="panel-raised w-full rounded-xl px-3 py-2.5 text-sm outline-none"
            />
          </label>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2.5">
          <label className="block">
            <span className="mb-1 block font-mono text-[9.5px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
              Schlaf (h)
            </span>
            <input
              type="number"
              step="0.5"
              name="sleep_hours"
              className="panel-raised w-full rounded-xl px-2 py-2.5 text-center text-sm outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[9.5px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
              Schritte
            </span>
            <input
              type="number"
              name="steps"
              className="panel-raised w-full rounded-xl px-2 py-2.5 text-center text-sm outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[9.5px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
              Cardio (min)
            </span>
            <input
              type="number"
              name="cardio_minutes"
              className="panel-raised w-full rounded-xl px-2 py-2.5 text-center text-sm outline-none"
            />
          </label>
        </div>

        {RATING_FIELDS.map((f) => (
          <label key={f.key} className="mb-3 block">
            <span className="mb-1.5 flex justify-between font-mono text-[11px] text-[var(--text-dim)]">
              <span>
                {f.emoji} {f.label}
              </span>
              <span className="text-[var(--accent)]">{ratings[f.key]}/10</span>
            </span>
            <input
              type="range"
              min={1}
              max={10}
              name={f.key}
              value={ratings[f.key]}
              onChange={(e) => setRatings((r) => ({ ...r, [f.key]: parseInt(e.target.value, 10) }))}
              className="w-full accent-[var(--accent)]"
            />
          </label>
        ))}

        <label className="mb-4 block">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
            Notizen
          </span>
          <textarea
            name="notes"
            placeholder="Alles im grünen Bereich, oder was ist aufgefallen?"
            className="panel-raised min-h-[70px] w-full rounded-xl px-3 py-2.5 text-sm outline-none"
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-2xl bg-[var(--accent)] py-3.5 text-sm font-bold text-white shadow-[0_4px_24px_rgba(255,59,59,0.35)] disabled:opacity-60"
        >
          {saving ? "Speichere…" : saved ? "✓ Gespeichert" : "Check-in speichern"}
        </button>
      </form>

      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
        Letzte Check-ins
      </div>
      <div className="space-y-2">
        {recentCheckins.map((c) => (
          <div key={c.id} className="panel flex items-center justify-between rounded-xl px-4 py-3">
            <div>
              <div className="text-sm font-semibold">
                {new Date(c.date).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" })}
              </div>
              <div className="font-mono text-[11px] text-[var(--text-faint)]">
                {weightByDate.get(c.date) ? `${weightByDate.get(c.date)}kg · ` : ""}
                Energie {c.energy_level ?? "–"}/10 · Schlaf {c.sleep_hours ?? "–"}h
              </div>
            </div>
          </div>
        ))}
        {recentCheckins.length === 0 && (
          <p className="text-sm text-[var(--text-faint)]">Noch keine Check-ins.</p>
        )}
      </div>

      <div className="mt-4">
        <PremiumTeaser
          title="Automatische Erinnerungen"
          description="Push-Nachricht, wenn dein Check-in fällig ist — verpasse keine Woche mehr."
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Check-in-Erinnerung</div>
              <div className="text-xs text-[var(--text-faint)]">Jeden Sonntag, 18:00 Uhr</div>
            </div>
            <div className="h-6 w-11 rounded-full bg-[var(--accent)]" />
          </div>
        </PremiumTeaser>
      </div>
    </div>
  );
}
