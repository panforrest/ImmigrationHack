import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "ImmigrationHack — GitHub for Immigration",
  description:
    "Every immigration journey is a repo. Organize evidence, track milestones, collaborate with lawyers and mentors, and contribute anonymized playbooks back to the next immigrant.",
  metadataBase: new URL("https://immigrationhack.vercel.app"),
  openGraph: {
    title: "ImmigrationHack — GitHub for Immigration",
    description:
      "Every immigration journey is a repo. Organize evidence, track milestones, collaborate with lawyers and mentors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        style={{
          background: "var(--gh-canvas-default)",
          color: "var(--gh-fg-default)",
        }}
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
