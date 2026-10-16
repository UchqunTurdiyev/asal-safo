// Telegram Bot API yordamchilari (server tomoni).

const api = (method: string) => `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`;

export async function tg<T = unknown>(method: string, payload: Record<string, unknown>): Promise<T> {
  const res = await fetch(api(method), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`Telegram ${method}: ${json.description}`);
  return json.result as T;
}

export const chatIds = () =>
  (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Lid haqidagi texnik ma'lumotlar xabar ichida yig'ma (expandable) blokda saqlanadi.
// "Sotib oldi" bosilganda Purchase hodisasi aynan shu ma'lumotlardan yig'iladi —
// ma'lumotlar bazasi kerak emas.
export type LeadMeta = {
  id: string;
  name: string;
  phone: string;
  address: string;
  t: number;
  url?: string;
  ip?: string;
  ua?: string;
  fbp?: string;
  fbc?: string;
};

const META_KEYS = ["id", "t", "url", "ip", "fbp", "fbc", "ua"] as const;

export function buildLeadMessage(l: LeadMeta) {
  const date = new Date(l.t * 1000).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const tech = META_KEYS.filter((k) => l[k] !== undefined && l[k] !== "")
    .map((k) => `${k}: ${escapeHtml(String(l[k]))}`)
    .join("\n");

  return [
    `🍯 <b>Yangi lid — Safo Asallari</b>`,
    ``,
    `👤 Ism: <b>${escapeHtml(l.name)}</b>`,
    `📞 Raqam: ${escapeHtml(l.phone)}`,
    `📍 Manzil: ${escapeHtml(l.address)}`,
    `🕒 ${date}`,
    ``,
    `<blockquote expandable>${tech}</blockquote>`,
  ].join("\n");
}

// Xabar matnidan (callback_query.message.text) lid ma'lumotlarini qayta o'qish.
export function parseLeadMessage(text: string): LeadMeta | null {
  const line = (re: RegExp) => text.match(re)?.[1]?.trim() ?? "";
  const meta: Record<string, string> = {};
  for (const k of META_KEYS) {
    const m = text.match(new RegExp(`^${k}: (.*)$`, "m"));
    if (m) meta[k] = m[1].trim();
  }
  if (!meta.id) return null;
  return {
    id: meta.id,
    t: Number(meta.t) || Math.floor(Date.now() / 1000),
    url: meta.url,
    ip: meta.ip,
    ua: meta.ua,
    fbp: meta.fbp,
    fbc: meta.fbc,
    name: line(/^👤 Ism: (.*)$/m),
    phone: line(/^📞 Raqam: (.*)$/m),
    address: line(/^📍 Manzil: (.*)$/m),
  };
}

export function leadKeyboard(siteUrl: string, phone: string, purchased = false) {
  const digits = phone.replace(/\D/g, "");
  // Telegram inline tugmalarida tel: havolasi ishlamaydi, shuning uchun /call sahifasi orqali.
  // Telegram localhost havolalarini qabul qilmaydi — lokal testda bu tugma chiqmaydi
  // (raqamning o'zi xabarda bosiladigan bo'ladi).
  const isPublic = /^https:\/\//.test(siteUrl) && !/localhost|127\.0\.0\.1/.test(siteUrl);
  return {
    inline_keyboard: [
      ...(isPublic
        ? [[{ text: "📞 Qo'ng'iroq qilish", url: `${siteUrl.replace(/\/$/, "")}/call?n=${digits}` }]]
        : []),
      [
        purchased
          ? { text: "✅ Sotib oldi — Metaga yuborilgan", callback_data: "noop" }
          : { text: "💰 Sotib oldi → Metaga yuborish", callback_data: "purchase" },
      ],
    ],
  };
}
