"use client";

import { IconLock, IconSparkle } from "@/lib/icons";

// Visible, non-interactive preview of a paid feature: real-looking content
// blurred behind a lock overlay. Nothing here is wired up — it exists purely
// to show what unlocking Premium would look like.
export default function PremiumTeaser({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel relative min-h-[210px] overflow-hidden rounded-3xl p-5">
      <div className="pointer-events-none select-none blur-[5px]" aria-hidden="true">
        {children}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/40 px-6 text-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-white">
          <IconLock className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
          <IconSparkle className="h-3 w-3" />
          Premium
        </div>
        <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
        <div className="max-w-[220px] text-xs text-[var(--text-dim)]">{description}</div>
      </div>
    </div>
  );
}
