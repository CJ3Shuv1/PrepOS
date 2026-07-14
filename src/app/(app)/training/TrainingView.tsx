"use client";

import { useState } from "react";
import type { Exercise, TrainingDay } from "@/lib/types";

export default function TrainingView({
  days,
  exercises,
}: {
  days: TrainingDay[];
  exercises: Exercise[];
}) {
  const [activeDayId, setActiveDayId] = useState(days[0]?.id ?? null);
  const activeDay = days.find((d) => d.id === activeDayId) ?? days[0];
  const dayExercises = exercises
    .filter((e) => e.day_id === activeDay?.id)
    .sort((a, b) => a.position - b.position);

  if (days.length === 0) {
    return (
      <div>
        <h1 className="mb-1 text-3xl font-extrabold tracking-tight">Trainingsplan</h1>
        <p className="mb-5 text-sm text-[var(--text-dim)]">Noch kein Plan hinterlegt.</p>
        <div className="panel rounded-2xl p-5 text-sm text-[var(--text-faint)]">
          Dein Coach trägt deinen Trainingsplan ein — schau bald wieder vorbei.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-1 text-3xl font-extrabold tracking-tight">{activeDay?.label}</h1>
      <p className="mb-4 text-sm text-[var(--text-dim)]">{activeDay?.sub}</p>

      <div className="mb-4 flex gap-2 overflow-x-auto">
        {days.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveDayId(d.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              d.id === activeDay?.id
                ? "bg-[var(--accent)] text-white"
                : "panel text-[var(--text-dim)]"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {dayExercises.map((ex) => (
          <div key={ex.id} className="panel rounded-2xl p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <span className="text-[15px] font-semibold">{ex.name}</span>
              {ex.intensity && (
                <span className="shrink-0 rounded-full bg-[rgba(255,59,59,0.12)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--accent)]">
                  {ex.intensity}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[12px] text-[var(--text-dim)]">
              {ex.sets != null && <span>{ex.sets} Sätze</span>}
              {ex.rep_range && <span>{ex.rep_range} Wdh.</span>}
              {ex.tempo && <span>Tempo {ex.tempo}</span>}
            </div>
            {ex.notes && (
              <div className="mt-2 text-[12.5px] text-[var(--text-faint)]">{ex.notes}</div>
            )}
          </div>
        ))}
        {dayExercises.length === 0 && (
          <p className="text-sm text-[var(--text-faint)]">Keine Übungen für diesen Tag.</p>
        )}
      </div>
    </div>
  );
}
