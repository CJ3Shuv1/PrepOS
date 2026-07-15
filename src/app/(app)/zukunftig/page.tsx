import {
  IconRemote,
  IconFileSpreadsheet,
  IconSparkle,
  IconPlate,
  IconDumbbell,
  IconCheckCircle,
  IconChart,
} from "@/lib/icons";

const HERO_FEATURES = [
  {
    Icon: IconRemote,
    title: "Volle Kontrolle, von überall",
    description:
      "Du behältst jederzeit Zugriff auf alle Trainingspläne deiner Trainees — passe Übungen, Sätze oder Makros direkt über die App an, egal wo du gerade bist. Keine Rückfrage nötig, keine Wartezeit.",
  },
  {
    Icon: IconFileSpreadsheet,
    title: "App oder Excel — du entscheidest",
    description:
      "Pläne direkt in der App bearbeiten, oder gewohnt per Excel importieren und exportieren. Dein bisheriger Workflow bleibt erhalten — die App ergänzt ihn, statt ihn dir aufzuzwingen.",
  },
];

const ROADMAP_ITEMS = [
  {
    Icon: IconChart,
    title: "KI Coach-Insights",
    description: "Automatische Trend-Analyse aus den Check-ins mit konkreten Anpassungsvorschlägen.",
  },
  {
    Icon: IconPlate,
    title: "KI-Ernährungsanalyse",
    description: "Freitext eintippen, Makros werden automatisch geschätzt — für dich und deine Trainees.",
  },
  {
    Icon: IconDumbbell,
    title: "Form-Check per Video",
    description: "Trainees laden Satz-Videos hoch, du gibst gezieltes Feedback direkt in der App.",
  },
  {
    Icon: IconCheckCircle,
    title: "Automatische Erinnerungen",
    description: "Push-Benachrichtigungen, wenn ein Check-in fällig ist — niemand vergisst mehr eine Woche.",
  },
  {
    Icon: IconChart,
    title: "Gesundheits-Vitalwerte",
    description: "Blutdruck, Ruhepuls und Nüchternblutzucker mittracken — sauber dokumentiert statt in Excel verstreut.",
  },
  {
    Icon: IconRemote,
    title: "Mehrere Trainees verwalten",
    description: "Ein Coach-Dashboard für alle deine Athleten gleichzeitig — Pläne, Fortschritt und Check-ins auf einen Blick.",
  },
  {
    Icon: IconChart,
    title: "Wettkampf-Timeline",
    description: "Show-Countdown, Phasen und Gewichtsverlauf bis zum großen Tag — visuell statt tabellarisch.",
  },
  {
    Icon: IconPlate,
    title: "Lebensmittel-Datenbank",
    description: "Eigene, durchsuchbare Zutatenliste mit Makros — einmal anlegen, überall wiederverwenden.",
  },
];

export default function ZukunftigPage() {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
        <IconSparkle className="h-3 w-3" />
        Roadmap
      </div>
      <h1 className="mb-1 text-3xl font-extrabold tracking-tight">Zukünftig</h1>
      <p className="mb-6 text-sm text-[var(--text-dim)]">
        Das hier ist erst der Anfang. Mit der Vollversion kommt das dazu:
      </p>

      <div className="mb-5 space-y-3">
        {HERO_FEATURES.map(({ Icon, title, description }) => (
          <div key={title} className="panel rounded-3xl p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
              <Icon className="h-5 w-5" />
            </div>
            <div className="mb-1.5 text-lg font-bold">{title}</div>
            <p className="text-[13px] leading-relaxed text-[var(--text-dim)]">{description}</p>
          </div>
        ))}
      </div>

      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
        Und außerdem geplant
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {ROADMAP_ITEMS.map(({ Icon, title, description }) => (
          <div key={title} className="panel rounded-2xl p-4">
            <Icon className="mb-2 h-4 w-4 text-[var(--accent)]" />
            <div className="mb-1 text-[13.5px] font-semibold">{title}</div>
            <p className="text-xs leading-relaxed text-[var(--text-faint)]">{description}</p>
          </div>
        ))}
      </div>

      <div className="panel mt-5 rounded-3xl p-5 text-center">
        <div className="mb-1.5 text-base font-bold">Interesse an der Vollversion?</div>
        <p className="text-[13px] text-[var(--text-dim)]">
          Sprich mit deinem Coach — gemeinsam schauen wir, was für euch Sinn ergibt.
        </p>
      </div>
    </div>
  );
}
