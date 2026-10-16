import { NextRequest, NextResponse } from "next/server";
import { chatIds, leadKeyboard, parseLeadMessage, tg } from "@/lib/telegram";
import { baseUrl, makeLeadToken } from "@/lib/leadToken";

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

  // Eski "callback" tugmali xabarlar: tugma summa kiritish sahifasiga ochiladigan URL tugmaga almashtiriladi.
  const phone = lead.phone.replace(/\D/g, "");
  const siteUrl = baseUrl(req);
  const token = makeLeadToken({
    id: lead.id,
    t: lead.t,
    url: lead.url,
    user: { phone, name: lead.name, externalId: phone, ip: lead.ip, userAgent: lead.ua, fbp: lead.fbp, fbc: lead.fbc },
    name: lead.name,
    phone,
    tg: { c: String(cq.message.chat.id), m: cq.message.message_id },
  });
  await tg("editMessageReplyMarkup", {
    chat_id: cq.message.chat.id,
    message_id: cq.message.message_id,
    reply_markup: leadKeyboard(siteUrl, phone, false, `${siteUrl}/sotuv?t=${token}`),
  }).catch((e) => console.error("[webhook]", e));
  await answer(cq.id, "Endi \"Sotib oldi → summa kiritish\" tugmasini bosing", true);
  return NextResponse.json({ ok: true });
}
