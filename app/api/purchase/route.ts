import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { sendMetaEvent } from "@/lib/meta";
import { baseUrl, decodeLeadToken } from "@/lib/leadToken";
import { escapeHtml, tg } from "@/lib/telegram";

export const runtime = "nodejs";

// SALES_PIN o'rnatilgan bo'lsa — PIN so'raladi. Bo'lmasa link (shifrlangan, faqat yopiq chatda) kifoya.
function pinOk(pin: string) {
  const expected = process.env.SALES_PIN;
  if (!expected) return true;
  const a = crypto.createHash("sha256").update(pin).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export async function POST(req: NextRequest) {
  try {
    const { token, value, pin, seller, note } = await req.json();

    if (!pinOk(String(pin ?? ""))) {
      await new Promise((r) => setTimeout(r, 1200));
      return NextResponse.json({ error: "PIN noto'g'ri" }, { status: 401 });
    }

    let lead;
    try {
      lead = decodeLeadToken(String(token ?? ""));
    } catch (e) {
      return NextResponse.json({ error: e instanceof Error ? e.message : "Link noto'g'ri" }, { status: 400 });
    }

    const amount = Math.round(Number(String(value ?? "").replace(/[^\d]/g, "")));
    if (!Number.isFinite(amount) || amount < 1000 || amount > 1_000_000_000) {
      return NextResponse.json({ error: "Summani to'g'ri kiriting (so'mda)" }, { status: 400 });
    }

    const currency = process.env.META_CURRENCY || "UZS";
    const sellerName = String(seller ?? "").trim().slice(0, 40);
    const cleanNote = String(note ?? "").trim().slice(0, 200);

    const res = await sendMetaEvent({
      eventName: "Purchase",
      // Lid bo'yicha barqaror ID — ikki marta yuborilsa ham Meta takrorni o'chiradi.
      eventId: `purchase_${lead.lid}`,
      sourceUrl: lead.url || baseUrl(req),
      userData: lead.ud,
      customData: { currency, value: amount, order_id: lead.lid, content_name: "Safo Asallari buyurtma" },
    });

    if (!res.ok) return NextResponse.json({ error: res.error || "Metaga yuborib bo'lmadi" }, { status: 502 });

    // Telegram: tugmalarni olib tashlash (qayta bosilmasin) va "Sotib oldi" javobini yozish.
    // Mijoz raqami xabar matnida qoladi — undan qo'ng'iroq qilish mumkin.
    if (lead.tg) {
      const time = new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
      const text =
        `✅ <b>Sotib oldi — Metaga Purchase yuborildi</b>\n\n` +
        `💰 Summa: <b>${fmt(amount)} ${escapeHtml(currency)}</b>\n` +
        (sellerName ? `👨‍💼 Sotuvchi: ${escapeHtml(sellerName)}\n` : "") +
        (cleanNote ? `📝 Izoh: ${escapeHtml(cleanNote)}\n` : "") +
        `🕒 ${escapeHtml(time)}`;
      await Promise.allSettled([
        tg("editMessageReplyMarkup", {
          chat_id: lead.tg.c,
          message_id: lead.tg.m,
          reply_markup: { inline_keyboard: [] },
        }),
        tg("sendMessage", {
          chat_id: lead.tg.c,
          text,
          parse_mode: "HTML",
          reply_parameters: { message_id: lead.tg.m, allow_sending_without_reply: true },
        }),
      ]);
    }

    return NextResponse.json({ ok: true, leadId: lead.lid, value: amount, currency });
  } catch (e) {
    console.error("[purchase]", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Server xatosi" }, { status: 500 });
  }
}
