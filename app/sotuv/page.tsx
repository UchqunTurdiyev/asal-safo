import type { Metadata } from "next";
import { decodeLeadToken } from "@/lib/leadToken";
import PurchaseForm from "./PurchaseForm";
import "./sotuv.css";

export const metadata: Metadata = { title: "Sotuvni tasdiqlash", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Telegramdagi "💰 Sotib oldi → summa kiritish" tugmasi shu sahifani ochadi.
export default async function SotuvPage({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t = "" } = await searchParams;

  let lead: ReturnType<typeof decodeLeadToken> | null = null;
  let error = "";
  try {
    lead = decodeLeadToken(t);
  } catch (e) {
    error = e instanceof Error ? e.message : "Link noto'g'ri";
  }

  if (!lead) {
    return (
      <main className="sale">
        <div className="sale-card">
          <h1>⚠️ Link ishlamaydi</h1>
          <p className="sale-muted">{error}</p>
        </div>
      </main>
    );
  }

  const ud = lead.ud as Record<string, unknown>;
  const date = new Date(lead.t * 1000).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const signals = [
    { k: "Telefon (hesh)", ok: !!ud.ph },
    { k: "Ism (hesh)", ok: !!ud.fn },
    { k: "external_id (hesh)", ok: !!ud.external_id },
    { k: "_fbc (reklama kliki)", ok: !!ud.fbc },
    { k: "_fbp (pixel cookie)", ok: !!ud.fbp },
    { k: "IP + brauzer", ok: !!ud.client_ip_address && !!ud.client_user_agent },
  ];

  return (
    <main className="sale">
      <div className="sale-card">
        <span className="sale-tag">🍯 Safo Asallari · lid</span>
        <h1>{lead.label}</h1>
        <p className="sale-muted">{date}</p>

        <div className="sale-signals">
          <p>Metaga ketadigan ma&apos;lumotlar (shifrlangan link ichida):</p>
          <ul>
            {signals.map((s) => (
              <li key={s.k} className={s.ok ? "ok" : "no"}>
                {s.ok ? "✓" : "—"} {s.k}
              </li>
            ))}
          </ul>
        </div>

        <PurchaseForm
          token={t}
          defaultValue={Number(process.env.META_PURCHASE_VALUE || 0) || undefined}
          currency={process.env.META_CURRENCY || "UZS"}
          pinRequired={!!process.env.SALES_PIN}
        />
      </div>
    </main>
  );
}
