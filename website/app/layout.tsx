import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Küchen Hargaßer — Küchenstudio Taufkirchen (Vils) bei München",
    template: "%s · Küchen Hargaßer",
  },
  description:
    "Ihr persönliches Küchenstudio in Taufkirchen (Vils) für München & Umgebung: Küchendesign, Renovierung, Arbeitsplatten nach Maß, eigene Werkstatt, 5 Jahre Garantie. 5,0 Sterne bei Google.",
  keywords: [
    "Küchenstudio Taufkirchen",
    "Küchen München",
    "Küchenplanung",
    "Küchenrenovierung",
    "Arbeitsplatten nach Maß",
    "Küchenmontage",
  ],
  openGraph: {
    title: "Küchen Hargaßer — Küchen, die bleiben.",
    description:
      "Persönliche Beratung, eigene Werkstatt, 5 Jahre Garantie. Küchenstudio in Taufkirchen (Vils) für München & Umgebung.",
    locale: "de_DE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#15130f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
