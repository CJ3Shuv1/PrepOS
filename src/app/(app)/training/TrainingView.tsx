"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Exercise, TrainingDay } from "@/lib/types";
import { addDay, addExercise, deleteDay, deleteExercise, updateExercise } from "./actions";
import PremiumTeaser from "../PremiumTeaser";

export default function TrainingView({
  days,
  exercises,
}: {
  days: TrainingDay[];
  exercises: Exercise[];
}) {
  const router = useRouter();
  const [activeDayId, setActiveDayId] = useState<string | null>(days[0]?.id ?? null);
  const [editing, setEditing] = useState(false);
  const [showAddDay, setShowAddDay] = useState(false);
  const activeDay = days.find((d) => d.id === activeDayId) ?? days[0];
  const dayExercises = exercises
    .filter((e) => e.day_id === activeDay?.id)
    .sort((a, b) => a.position - b.position);

  const refresh = () => router.refresh();

  if (days.length === 0 && !editing) {
    return (
      <div>
        <h1 className="mb-1 text-3xl font-extrabold tracking-tight">Trainingsplan</h1>
        <p className="mb-5 text-sm text-[var(--text-dim)]">Noch kein Plan hinterlegt.</p>
        <button
          onClick={() => setEditing(true)}
          className="w-full rounded-2xl bg-[var(--accent)] py-3.5 text-sm font-bold text-white"
        >
          Plan anlegen
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-1 flex items-start justify-between gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">{activeDay?.label ?? "Trainingsplan"}</h1>
        <button
          onClick={() => setEditing((e) => !e)}
          className={`shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold ${
            editing ? "bg-[var(--accent)] text-white" : "panel text-[var(--text-dim)]"
          }`}
        >
          {editing ? "Fertig" : "Bearbeiten"}
        </button>
      </div>
      <p className="mb-4 text-sm text-[var(--text-dim)]">{activeDay?.sub}</p>

      <div className="mb-4 flex gap-2 overflow-x-auto">
        {days.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveDayId(d.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              d.id === activeDay?.id ? "bg-[var(--accent)] text-white" : "panel text-[var(--text-dim)]"
            }`}
          >
            {d.label}
          </button>
        ))}
        {editing && (
          <button
            onClick={() => setShowAddDay(true)}
            className="panel shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-dim)]"
          >
            + Tag
          </button>
        )}
      </div>

      {showAddDay && (
        <AddDayForm
          onDone={() => {
            setShowAddDay(false);
            refresh();
          }}
        />
      )}

      {editing && activeDay && (
        <button
          onClick={async () => {
            if (confirm(`Tag "${activeDay.label}" wirklich löschen?`)) {
              await deleteDay(activeDay.id);
              setActiveDayId(null);
              refresh();
            }
          }}
          className="mb-3 font-mono text-[10.5px] text-[var(--text-faint)] underline"
        >
          Diesen Tag löschen
        </button>
      )}

      <div className="space-y-2.5 lg:grid lg:grid-cols-2 lg:gap-2.5 lg:space-y-0">
        {dayExercises.map((ex) =>
          editing ? (
            <EditableExerciseCard
              key={ex.id}
              exercise={ex}
              onChanged={refresh}
              onDelete={async () => {
                await deleteExercise(ex.id);
                refresh();
              }}
            />
          ) : (
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
              {ex.notes && <div className="mt-2 text-[12.5px] text-[var(--text-faint)]">{ex.notes}</div>}
            </div>
          )
        )}
        {dayExercises.length === 0 && (
          <p className="text-sm text-[var(--text-faint)]">Keine Übungen für diesen Tag.</p>
        )}
      </div>

      {editing && activeDay && (
        <button
          onClick={async () => {
            await addExercise(activeDay.id);
            refresh();
          }}
          className="mt-3 w-full rounded-2xl border border-dashed border-[var(--panel-border)] p-3.5 text-sm text-[var(--text-faint)]"
        >
          + Übung hinzufügen
        </button>
      )}

      <div className="mt-4">
        <PremiumTeaser
          title="Form-Check per Video"
          description="Lade ein Satz-Video hoch, dein Coach gibt dir gezieltes Feedback zur Ausführung."
        >
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 shrink-0 rounded-xl bg-white/70" />
            <div className="flex-1">
              <div className="text-sm font-semibold">Beinpresse — Satz 3</div>
              <div className="text-xs text-[var(--text-faint)]">Hochgeladen vor 2 Std. · Feedback ausstehend</div>
            </div>
          </div>
        </PremiumTeaser>
      </div>
    </div>
  );
}

function AddDayForm({ onDone }: { onDone: () => void }) {
  const [label, setLabel] = useState("");
  const [sub, setSub] = useState("");
  return (
    <div className="panel mb-4 rounded-2xl p-4">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="z.B. Push"
        className="panel-raised mb-2 w-full rounded-lg px-3 py-2.5 text-sm outline-none"
      />
      <input
        value={sub}
        onChange={(e) => setSub(e.target.value)}
        placeholder="z.B. Brust · Schulter · Trizeps"
        className="panel-raised mb-3 w-full rounded-lg px-3 py-2.5 text-sm outline-none"
      />
      <button
        onClick={async () => {
          if (!label.trim()) return;
          await addDay(label.trim(), sub.trim());
          onDone();
        }}
        className="w-full rounded-xl bg-[var(--accent)] py-2.5 text-sm font-bold text-white"
      >
        Tag anlegen
      </button>
    </div>
  );
}

function EditableExerciseCard({
  exercise,
  onChanged,
  onDelete,
}: {
  exercise: Exercise;
  onChanged: () => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(exercise.name);
  const [sets, setSets] = useState(exercise.sets ?? 0);
  const [repRange, setRepRange] = useState(exercise.rep_range ?? "");
  const [tempo, setTempo] = useState(exercise.tempo ?? "");
  const [intensity, setIntensity] = useState(exercise.intensity ?? "");
  const [notes, setNotes] = useState(exercise.notes ?? "");

  async function commit(patch: Record<string, unknown>) {
    await updateExercise(exercise.id, patch);
    onChanged();
  }

  return (
    <div className="panel rounded-2xl p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => name !== exercise.name && commit({ name })}
          className="w-full bg-transparent text-[15px] font-semibold outline-none"
        />
        <button onClick={onDelete} className="shrink-0 text-[var(--text-faint)]">
          ✕
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <LabeledInput label="Sätze" value={sets} onChange={(v) => setSets(parseInt(v, 10) || 0)} onBlur={() => commit({ sets })} type="number" />
        <LabeledInput label="Wdh." value={repRange} onChange={setRepRange} onBlur={() => commit({ rep_range: repRange || null })} />
        <LabeledInput label="Tempo" value={tempo} onChange={setTempo} onBlur={() => commit({ tempo: tempo || null })} />
        <LabeledInput label="Intensität" value={intensity} onChange={setIntensity} onBlur={() => commit({ intensity: intensity || null })} />
      </div>
      <label className="mt-2 block">
        <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
          Notizen
        </span>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => commit({ notes })}
          className="panel-raised w-full rounded-lg px-2.5 py-2 text-[12.5px] outline-none"
        />
      </label>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  onBlur: () => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="panel-raised w-full rounded-lg px-2.5 py-2 text-[13px] outline-none"
      />
    </label>
  );
}
