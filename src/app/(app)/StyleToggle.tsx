"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { UiStyle } from "@/lib/types";
import { setUiStyle } from "./actions";

export default function StyleToggle({ current }: { current: UiStyle }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const next: UiStyle = current === "glass" ? "solid" : "glass";

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await setUiStyle(next);
          router.refresh();
        })
      }
      disabled={pending}
      title={current === "glass" ? "Zu Solid wechseln" : "Zu Glass wechseln"}
      className="panel-raised flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold text-[var(--text-dim)] disabled:opacity-50"
    >
      <span>{current === "glass" ? "◐" : "◑"}</span>
      {current === "glass" ? "Glass" : "Solid"}
    </button>
  );
}
