import type { Metadata, Viewport } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="ambient-glow" />
        {children}
      </body>
    </html>
  );
}
