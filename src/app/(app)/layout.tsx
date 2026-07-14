import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import StyleToggle from "./StyleToggle";
import type { UiStyle } from "@/lib/types";

const NAV = [
  { href: "/dashboard", emoji: "📊", label: "Dashboard" },
  { href: "/nutrition", emoji: "🍽", label: "Ernährung" },
  { href: "/training", emoji: "🏋️", label: "Training" },
  { href: "/checkin", emoji: "✅", label: "Check-in" },
];

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: settings } = await supabase
    .from("user_settings")
    .select("ui_style")
    .eq("user_id", user.id)
    .maybeSingle();

  const uiStyle: UiStyle = settings?.ui_style === "solid" ? "solid" : "glass";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[640px] flex-col">
      <div className="mx-3 mt-4 flex items-center gap-2 sm:mx-4">
        <div className="panel flex flex-1 gap-1 rounded-2xl p-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-0.5 py-2 text-[var(--text-dim)] hover:text-[var(--text)]"
            >
              <span className="text-base leading-none">{item.emoji}</span>
              <span className="w-full truncate text-center font-mono text-[9px] font-semibold uppercase leading-none">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <StyleToggle current={uiStyle} />
      </div>

      <main className="flex-1 px-3 pb-10 pt-4 sm:px-4">{children}</main>

      <div className="px-4 pb-6 text-center">
        <form action={signOut}>
          <button
            type="submit"
            className="font-mono text-[10.5px] text-[var(--text-faint)] underline"
          >
            Abmelden ({user.email})
          </button>
        </form>
      </div>
    </div>
  );
}
