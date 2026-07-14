"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "@/app/auth/actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        action={formAction}
        className="panel w-full max-w-sm rounded-3xl p-7 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
          PrepOS
        </div>
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Anmelden</h1>

        <label className="mb-3 block">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
            E-Mail
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="panel-raised w-full rounded-xl px-3 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
        </label>

        <label className="mb-5 block">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
            Passwort
          </span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="panel-raised w-full rounded-xl px-3 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
        </label>

        {state?.error && (
          <p className="mb-4 text-sm text-[#ff6b6b]">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-2xl bg-[var(--accent)] py-3.5 font-semibold text-white shadow-[0_4px_24px_rgba(255,59,59,0.35)] disabled:opacity-60"
        >
          {pending ? "Melde an…" : "Anmelden"}
        </button>

        <p className="mt-5 text-center text-sm text-[var(--text-dim)]">
          Noch kein Konto?{" "}
          <Link href="/signup" className="text-[var(--accent)] underline">
            Registrieren
          </Link>
        </p>
      </form>
    </div>
  );
}
