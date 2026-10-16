import type { Metadata } from "next";
import Countdown from "./Countdown";

export const metadata: Metadata = { title: "Раҳмат!", robots: { index: false } };

// Forma yuborilgandan so'ng shu sahifa ochiladi, 10 soniyadan keyin Telegram lichkaga o'tadi.
export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const { name = "" } = await searchParams;
  const first = name.trim().split(/\s+/)[0]?.slice(0, 30) || "";

  return (
    <main className="thanks-page">
      <div className="thanks-card">
        <div className="done-icon thanks-check" aria-hidden>✓</div>
        <p className="eyebrow">Ариза қабул қилинди</p>
        <h1>Раҳмат{first ? `, ${first}` : ""}!</h1>
        <p className="thanks-text">
          Буюртмангизни тасдиқлаш учун Телеграмга ўтасиз — мутахассисимиз сизга мос асални танлаб беради.
        </p>
        <Countdown seconds={10} />
      </div>
    </main>
  );
}
