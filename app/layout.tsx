import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Сафо Асаллари — 100% табиий, шифобахш асал | Ўзбекистон бўйлаб етказиб бериш",
  description:
    "Тоғ асали, гул асали ва ноёб асал турлари. Шакар ва қўшимчасиз, сифат кафолати билан. Бутун Ўзбекистон бўйлаб етказиб берамиз — ариза қолдиринг.",
  openGraph: {
    title: "Сафо Асаллари — 100% табиий асал",
    description: "Шифобахш ва ноёб асаллар. Сифат кафолати. Ўзбекистон бўйлаб етказиб бериш.",
    type: "website",
    locale: "uz_UZ",
  },
};

export const viewport: Viewport = { themeColor: "#1F1408", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz-Cyrl" className={`${sans.variable} ${serif.variable}`}>
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
