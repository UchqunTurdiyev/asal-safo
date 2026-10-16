import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Safo Asallari — 100% tabiiy, shifobaxsh asal | O'zbekiston bo'ylab yetkazib berish",
  description:
    "Tog' asali, gul asali va noyob asal turlari. Shakar va qo'shimchasiz, sifat kafolati bilan. Butun O'zbekiston bo'ylab yetkazib beramiz — ariza qoldiring.",
  openGraph: {
    title: "Safo Asallari — 100% tabiiy asal",
    description: "Shifobaxsh va noyob asallar. Sifat kafolati. O'zbekiston bo'ylab yetkazib berish.",
    type: "website",
    locale: "uz_UZ",
  },
};

export const viewport: Viewport = { themeColor: "#1F1408", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${sans.variable} ${serif.variable}`}>
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
