# Safo Asallari — sayt (Next.js App Router)

Asal sotish uchun lid-sayt: taklif + forma (ism, raqam, manzil) → lid Telegram botga tushadi →
mijoz Telegram lichkaga (@Safoasallari) o'tadi. Meta Pixel + Conversions API ulangan.

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # qiymatlarni to'ldiring
npm run dev                  # http://localhost:3000
```

## Sozlash (.env.local)

| O'zgaruvchi | Nima |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Saytning haqiqiy https manzili (Telegram "Qo'ng'iroq" tugmasi va webhook uchun) |
| `NEXT_PUBLIC_PHONE` | Saytdagi qo'ng'iroq raqami |
| `TELEGRAM_BOT_TOKEN` | @BotFather dan yangi bot tokeni |
| `TELEGRAM_CHAT_ID` | Lid tushadigan chat ID (shaxsiy yoki guruh, `-100...`). Bir nechtasi vergul bilan |
| `TELEGRAM_WEBHOOK_SECRET` | Ixtiyoriy uzun satr (A-Z, a-z, 0-9, `_`, `-`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Events Manager → Pixel ID |
| `META_CAPI_ACCESS_TOKEN` | Events Manager → Settings → Conversions API → Generate access token |
| `META_TEST_EVENT_CODE` | Test paytida "Test events" kodi; prodda bo'sh |
| `META_PURCHASE_VALUE` | Sotuv sahifasidagi summa maydonining boshlang'ich qiymati (ixtiyoriy) |
| `META_CURRENCY` | Valyuta (standart `UZS`) |
| `SALES_PIN` | Ixtiyoriy: sotuv sahifasida PIN so'rash |
| `LEAD_TOKEN_SECRET` | Ixtiyoriy: link shifrlash kaliti (bo'lmasa bot tokenidan olinadi) |

**Chat ID ni bilish:** botga (yoki bot qo'shilgan guruhga) biror xabar yozing va
`https://api.telegram.org/bot<TOKEN>/getUpdates` ni oching — `chat.id` ni oling.

## Deploy (Vercel)

1. Loyihani Vercelga yuklang, Environment Variables ga yuqoridagilarni kiriting.
2. Deploydan so'ng **bir marta** oching:
   `https://SAYTINGIZ/api/telegram/setup?key=TELEGRAM_WEBHOOK_SECRET`
   — bu "Sotib oldi" tugmasi ishlashi uchun bot webhookini o'rnatadi.

## Qanday ishlaydi

1. Mijoz formani to'ldirib **Yuborish** bosadi.
2. `/api/lead` → Telegram botga lid xabari keladi, ikkita tugma bilan:
   - **📞 Qo'ng'iroq qilish** — `/call?n=...` sahifasi ochilib, raqam darhol teriladi
     (Telegram tugmalari `tel:` ni to'g'ridan-to'g'ri qo'llamaydi). Xabardagi raqamning o'zi ham bosiladi.
   - **💰 Sotib oldi → summa kiritish** — mijoz to'lov qilgach bosiladi. `/sotuv` sahifasi ochiladi:
     sotuvchi **to'langan summani** (va ismini) kiritadi → server Meta CAPI ga `Purchase { value, currency }`
     yuboradi (heshlangan telefon/ism/external_id + fbp/fbc, IP, UA). Shunda Metada **Purchase va ROAS** ishlaydi.
     Tugma ichidagi link AES-256-GCM bilan shifrlangan — kalitsiz o'qib/o'zgartirib bo'lmaydi.
     Yuborilgach tugma o'chadi va xabarga "✅ Sotib oldi — 350 000 UZS" javobi tushadi.
     Bu tugma **webhook talab qilmaydi**.
3. Bir vaqtda Meta ga `Lead` hodisasi ikki yo'l bilan ketadi: brauzer Pixel va server CAPI —
   bir xil `event_id` bilan, Meta ularni bitta hodisa deb hisoblaydi (deduplikatsiya).
4. Mijoz avtomatik ravishda Telegram lichkaga (`t.me/Safoasallari`) yo'naltiriladi.

Lid texnik ma'lumotlari (fbp, fbc, IP...) Telegram xabarining yig'ma blokida saqlanadi —
shuning uchun ma'lumotlar bazasi kerak emas.

## Matnlarni o'zgartirish

Barcha mahsulotlar, afzalliklar, FAQ — `lib/site.ts` da. Asosiy sahifa — `app/page.tsx`.
# asal-safo
