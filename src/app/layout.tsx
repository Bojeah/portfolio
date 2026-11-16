import type { Metadata, Viewport } from "next";
import "@fontsource/jetbrains-mono/400";
import "@fontsource/jetbrains-mono/500";
import "@fontsource/jetbrains-mono/700";
import "@fontsource/space-grotesk/500";
import "@fontsource/space-grotesk/700";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CommandPalette from "@/components/CommandPalette";
import ScrollTelemetry from "@/components/ScrollTelemetry";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { default: site.title, template: `%s // ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ScrollTelemetry />
        <CommandPalette />
        <a className="skip-link" href="#content">
          [Skip to content]
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
