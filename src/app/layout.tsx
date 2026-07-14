import type { Metadata, Viewport } from "next";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "PrepOS",
  description: "Dein Coaching-Cockpit für Training, Ernährung und Fortschritt.",
};

export const viewport: Viewport = {
  themeColor: "#eef0f5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let uiStyle: "glass" | "solid" = "glass";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: settings } = await supabase
      .from("user_settings")
      .select("ui_style")
      .eq("user_id", user.id)
      .maybeSingle();
    if (settings?.ui_style === "solid") uiStyle = "solid";
  }

  return (
    <html lang="de" data-style={uiStyle} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="ambient-glow" />
        {children}
      </body>
    </html>
  );
}
