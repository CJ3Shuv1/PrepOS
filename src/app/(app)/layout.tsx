import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { IconChart, IconPlate, IconDumbbell, IconCheckCircle } from "@/lib/icons";

const NAV = [
  { href: "/dashboard", Icon: IconChart, label: "Dashboard" },
  { href: "/nutrition", Icon: IconPlate, label: "Ernährung" },
  { href: "/training", Icon: IconDumbbell, label: "Training" },
  { href: "/checkin", Icon: IconCheckCircle, label: "Check-in" },
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

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[640px] flex-col">
      <div className="mx-3 mt-4 sm:mx-4">
        <div className="panel flex gap-1 rounded-2xl p-1">
          {NAV.map(({ href, Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-0.5 py-2.5 text-[var(--text-dim)] hover:text-[var(--text)]"
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="w-full truncate text-center font-mono text-[9px] font-semibold uppercase leading-none">
                {label}
              </span>
            </Link>
          ))}
        </div>
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
