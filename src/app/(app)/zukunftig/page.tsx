import {
  IconRemote,
  IconFileSpreadsheet,
  IconPalette,
  IconSparkle,
  IconShieldCheck,
  IconPlate,
  IconDumbbell,
  IconCheckCircle,
  IconChart,
  IconPhone,
  IconMail,
} from "@/lib/icons";

const CONTACT = {
  name: "Cedric Rodej",
  phone: "0177 7434814",
  phoneHref: "tel:+491777434814",
  email: "cedric.magnar.rodej@gmail.com",
};

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
  {
    Icon: IconPalette,
    title: "Deine Farben, dein Logo, deine App",
    description:
      "Farbschema, Logo und Branding werden auf dich zugeschnitten. Deine Trainees sehen deine Marke — nicht irgendeine Fremd-App.",
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
      <h1 className="mb-1 bg-gradient-to-br from-[var(--text)] to-[var(--text-dim)] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
        Zukünftig
      </h1>
      <p className="mb-4 text-sm text-[var(--text-dim)]">
        Das hier ist erst der Prototyp. Alles, was du hier siehst, ist technisch bereits umsetzbar.
      </p>

      <div className="panel mb-6 flex items-center gap-3 rounded-2xl p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
          <IconShieldCheck className="h-4 w-4" />
        </div>
        <p className="text-[13px] leading-snug text-[var(--text)]">
          <span className="font-semibold">Kein Wunschdenken.</span> Jedes Feature unten ist machbar — Umfang und
          Preis stimmen wir gemeinsam ab, sobald du dich entscheidest.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 xl:grid-cols-3">
        {HERO_FEATURES.map(({ Icon, title, description }) => (
          <div key={title} className="panel relative overflow-hidden rounded-3xl p-5">
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--accent)] opacity-[0.07]" />
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#c41f1f] text-white shadow-[0_4px_14px_rgba(255,59,59,0.35)]">
              <Icon className="h-5 w-5" />
            </div>
            <div className="mb-1.5 text-lg font-bold">{title}</div>
            <p className="text-[13px] leading-relaxed text-[var(--text-dim)]">{description}</p>
          </div>
        ))}
      </div>

      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
        Und außerdem umsetzbar
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {ROADMAP_ITEMS.map(({ Icon, title, description }) => (
          <div key={title} className="panel rounded-2xl p-4">
            <div className="mb-2 flex items-center justify-between">
              <Icon className="h-4 w-4 text-[var(--accent)]" />
              <span className="rounded-full bg-[rgba(18,185,129,0.12)] px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.05em] text-[var(--good)]">
                Umsetzbar
              </span>
            </div>
            <div className="mb-1 text-[13.5px] font-semibold">{title}</div>
            <p className="text-xs leading-relaxed text-[var(--text-faint)]">{description}</p>
          </div>
        ))}
      </div>

      <div className="panel mt-6 rounded-3xl p-6 text-center">
        <div className="mb-1.5 text-lg font-bold">Bereit, das für dein Coaching freizuschalten?</div>
        <p className="mb-5 text-[13px] text-[var(--text-dim)]">
          Lass uns kurz sprechen, was du wirklich brauchst — dann bauen wir gemeinsam den Umfang und finden einen
          fairen Preis.
        </p>

        <div className="space-y-2.5">
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-3 rounded-2xl bg-[var(--accent)] px-4 py-3.5 text-left shadow-[0_4px_20px_rgba(255,59,59,0.35)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
              <IconPhone className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{CONTACT.phone}</div>
              <div className="text-[11px] text-white/80">Jetzt anrufen</div>
            </div>
          </a>
          <a
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("PrepOS – Interesse an der Vollversion")}`}
            className="panel-raised flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-dim)] text-[var(--accent)]">
              <IconMail className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">{CONTACT.email}</div>
              <div className="text-[11px] text-[var(--text-faint)]">E-Mail schreiben</div>
            </div>
          </a>
        </div>

        <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
          {CONTACT.name}
        </div>
      </div>
    </div>
  );
}
