import type { Metadata } from "next";
import { formatPhone } from "@/lib/site";
import AutoDial from "./AutoDial";

export const metadata: Metadata = { title: "Қўнғироқ қилиш", robots: { index: false } };

// Telegram botdagi "Qo'ng'iroq qilish" tugmasi shu sahifani ochadi va darhol raqam teriladi.
export default async function CallPage({ searchParams }: { searchParams: Promise<{ n?: string }> }) {
  const { n = "" } = await searchParams;
  const digits = n.replace(/\D/g, "").slice(0, 15);
  const href = `tel:+${digits}`;

  return (
    <main className="call-page">
      <div className="call-card">
        <div className="call-icon" aria-hidden>📞</div>
        <p className="eyebrow">Мижозга қўнғироқ</p>
        <h1>{digits ? formatPhone(digits) : "Рақам топилмади"}</h1>
        {digits && (
          <>
            <a className="btn btn-primary btn-lg" href={href}>
              Қўнғироқ қилиш
            </a>
            <AutoDial href={href} />
          </>
        )}
      </div>
    </main>
  );
}
