import { NextRequest, NextResponse } from "next/server";
import { sendMetaEvent } from "@/lib/meta";
import { chatIds, leadKeyboard, parseLeadMessage, tg } from "@/lib/telegram";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type CallbackQuery = {
  id: string;
  data?: string;
  from: { id: number; first_name?: string; username?: string };
  message?: { message_id: number; chat: { id: number }; text?: string };
};

const answer = (id: string, text: string, show_alert = false) =>
  tg("answerCallbackQuery", { callback_query_id: id, text, show_alert }).catch(() => {});

export async function POST(req: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret && req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = await req.json().catch(() => null);
  const cq: CallbackQuery | undefined = update?.callback_query;
  if (!cq?.message) return NextResponse.json({ ok: true });

  // Faqat lid tushadigan chatlardagi tugmalar ishlaydi.
  if (!chatIds().includes(String(cq.message.chat.id))) {
    await answer(cq.id, "Ruxsat yo'q");
    return NextResponse.json({ ok: true });
  }

  if (cq.data === "noop") {
    await answer(cq.id, "Bu mijoz allaqachon Metaga yuborilgan ✅");
    return NextResponse.json({ ok: true });
  }

  if (cq.data !== "purchase") return NextResponse.json({ ok: true });

  const lead = parseLeadMessage(cq.message.text || "");
  if (!lead) {
    await answer(cq.id, "Lid ma'lumotlarini o'qib bo'lmadi", true);
    return NextResponse.json({ ok: true });
  }

  const value = Number(process.env.META_PURCHASE_VALUE || 0);
  const currency = process.env.META_CURRENCY || "UZS";
  const phone = lead.phone.replace(/\D/g, "");

  const res = await sendMetaEvent({
    eventName: "Purchase",
    // Lid bo'yicha barqaror ID — tugma ikki marta bosilsa ham Meta takrorni o'chiradi.
    eventId: `purchase_${lead.id}`,
    sourceUrl: lead.url || site.url,
    user: {
      phone,
      name: lead.name,
      externalId: phone,
      ip: lead.ip,
      userAgent: lead.ua,
      fbp: lead.fbp,
      fbc: lead.fbc,
    },
    customData: { currency, value, content_name: "Safo Asallari buyurtma" },
  });

  if (!res.ok) {
    await answer(cq.id, `Xatolik: ${res.error}`.slice(0, 190), true);
    return NextResponse.json({ ok: true });
  }

  const who = cq.from.username ? `@${cq.from.username}` : cq.from.first_name || "operator";
  await Promise.allSettled([
    tg("editMessageReplyMarkup", {
      chat_id: cq.message.chat.id,
      message_id: cq.message.message_id,
      reply_markup: leadKeyboard(site.url, phone, true),
    }),
    tg("sendMessage", {
      chat_id: cq.message.chat.id,
      reply_parameters: { message_id: cq.message.message_id },
      text: `✅ Purchase Metaga yuborildi (${value.toLocaleString("ru-RU")} ${currency}) — ${who}`,
    }),
  ]);
  await answer(cq.id, "Metaga yuborildi ✅");
  return NextResponse.json({ ok: true });
}
