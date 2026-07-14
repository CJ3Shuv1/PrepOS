import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LineChart from "../LineChart";
import PremiumTeaser from "../PremiumTeaser";
import { IconPlate, IconDumbbell, IconCheckCircle } from "@/lib/icons";
import type { MacroTarget, WeightEntry } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile }, { data: weights }, { data: targets }] = await Promise.all([
    supabase.from("profiles").select("*").eq("user_id", user!.id).maybeSingle(),
    supabase
      .from("weight_log")
      .select("*")
      .eq("user_id", user!.id)
      .order("date", { ascending: true })
      .limit(60),
    supabase.from("macro_targets").select("*").eq("user_id", user!.id),
  ]);

  const weightEntries = (weights || []) as WeightEntry[];
  const latest = weightEntries[weightEntries.length - 1];
  const first = weightEntries[0];
  const delta = latest && first ? Math.round((latest.weight - first.weight) * 10) / 10 : null;

  const macroTargets = (targets || []) as MacroTarget[];
  const training = macroTargets.find((t) => t.day_type === "training");
  const rest = macroTargets.find((t) => t.day_type === "rest");

  const chartPoints = weightEntries.map((w) => ({
    label: new Date(w.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }),
    value: w.weight,
  }));

  return (
    <div>
      <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
        PrepOS
      </div>
      <h1 className="mb-1 text-3xl font-extrabold tracking-tight">
        Willkommen zurück{profile?.name ? `, ${profile.name}` : ""}
      </h1>
      <p className="mb-5 text-sm text-[var(--text-dim)]">
        {profile?.phase ? `Aktuelle Phase: ${profile.phase}` : "Dein Fortschritt auf einen Blick."}
      </p>

      <div className="panel mb-4 rounded-3xl p-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
              Aktuelles Gewicht
            </div>
            <div className="text-3xl font-extrabold">
              {latest ? `${latest.weight} kg` : "—"}
            </div>
          </div>
          {delta !== null && (
            <div
              className={`rounded-full px-2.5 py-1 font-mono text-xs font-bold ${
                delta <= 0 ? "bg-[rgba(52,211,153,0.15)] text-[var(--good)]" : "bg-[rgba(255,59,59,0.15)] text-[var(--accent)]"
              }`}
            >
              {delta > 0 ? "+" : ""}
              {delta} kg
            </div>
          )}
        </div>
        <LineChart points={chartPoints} />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <MacroCard label="Trainingstag" target={training} />
        <MacroCard label="Ruhetag" target={rest} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/nutrition" className="panel rounded-2xl p-4">
          <IconPlate className="mb-2 h-5 w-5 text-[var(--text-dim)]" />
          <div className="text-sm font-semibold">Ernährungsplan</div>
          <div className="text-xs text-[var(--text-faint)]">Mahlzeiten & Makros</div>
        </Link>
        <Link href="/training" className="panel rounded-2xl p-4">
          <IconDumbbell className="mb-2 h-5 w-5 text-[var(--text-dim)]" />
          <div className="text-sm font-semibold">Trainingsplan</div>
          <div className="text-xs text-[var(--text-faint)]">Übungen & Sätze</div>
        </Link>
        <Link href="/checkin" className="panel col-span-2 rounded-2xl p-4">
          <IconCheckCircle className="mb-2 h-5 w-5 text-[var(--text-dim)]" />
          <div className="text-sm font-semibold">Check-in eintragen</div>
          <div className="text-xs text-[var(--text-faint)]">Gewicht, Schlaf, Energie & mehr</div>
        </Link>
      </div>

      <div className="mt-4">
        <PremiumTeaser
          title="KI Coach-Insights"
          description="Automatische Trend-Analyse deiner Check-ins mit konkreten Anpassungsvorschlägen."
        >
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
            Diese Woche
          </div>
          <div className="mb-1 text-lg font-bold">Kalorienzufuhr leicht erhöhen</div>
          <p className="text-xs text-[var(--text-dim)]">
            Dein Gewichtsverlust hat sich beschleunigt — +150 kcal an Trainingstagen empfohlen, um die Rate zu stabilisieren.
          </p>
        </PremiumTeaser>
      </div>
    </div>
  );
}

function MacroCard({ label, target }: { label: string; target: MacroTarget | undefined }) {
  return (
    <div className="panel rounded-2xl p-4">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
        {label}
      </div>
      {target ? (
        <>
          <div className="mb-1 text-2xl font-extrabold">{target.kcal ?? "—"} kcal</div>
          <div className="font-mono text-[11px] text-[var(--text-dim)]">
            {target.protein ?? "—"}g P · {target.carbs ?? "—"}g C · {target.fett ?? "—"}g F
          </div>
        </>
      ) : (
        <div className="text-sm text-[var(--text-faint)]">Noch nicht gesetzt</div>
      )}
    </div>
  );
}
