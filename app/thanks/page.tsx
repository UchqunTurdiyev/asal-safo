import type { Metadata } from "next";
import Countdown from "./Countdown";

export const metadata: Metadata = { title: "Rahmat!", robots: { index: false } };

// Forma yuborilgandan so'ng shu sahifa ochiladi, 10 soniyadan keyin Telegram lichkaga o'tadi.
export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const { name = "" } = await searchParams;
  const first = name.trim().split(/\s+/)[0]?.slice(0, 30) || "";

  return (
    <main className="thanks-page">
      <div className="thanks-card">
        <div className="done-icon thanks-check" aria-hidden>✓</div>
        <p className="eyebrow">Ariza qabul qilindi</p>
        <h1>Rahmat{first ? `, ${first}` : ""}!</h1>
        <p className="thanks-text">
          Buyurtmangizni tasdiqlash uchun Telegramga o&apos;tasiz — mutaxassisimiz sizga mos asalni tanlab beradi.
        </p>
        <Countdown seconds={10} />
      </div>
    </main>
  );
}
