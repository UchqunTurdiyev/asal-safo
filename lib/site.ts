// Saytdagi barcha matn va kontaktlar shu yerda — o'zgartirish oson bo'lsin uchun.

export const site = {
  name: "Safo Asallari",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: process.env.NEXT_PUBLIC_PHONE || "+998901234567",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "Safoasallari",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "safo.asallari",
};

export const telegramLink = `https://t.me/${site.telegram}`;
export const instagramLink = `https://www.instagram.com/${site.instagram}/`;
export const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 12) return raw;
  return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
}

export const benefits = [
  {
    icon: "leaf",
    title: "100% tabiiy",
    text: "Shakar, sirop yoki qo'shimchasiz. Faqat ari va tabiat.",
  },
  {
    icon: "shield",
    title: "Sifat kafolati",
    text: "Asal yoqmasa yoki tabiiy bo'lmasa — pulingizni to'liq qaytaramiz.",
  },
  {
    icon: "truck",
    title: "Butun O'zbekistonga",
    text: "Toshkentdan Nukusgacha — har bir viloyatga yetkazib beramiz.",
  },
  {
    icon: "star",
    title: "Noyob turlar",
    text: "Bozorda topilmaydigan, kam uchraydigan asal navlari bizda bor.",
  },
];

export const steps = [
  { title: "Ariza qoldiring", text: "Ism, raqam va manzilingizni yozing — 30 soniya." },
  { title: "Maslahat oling", text: "Mutaxassisimiz sizga mos asal turini tanlab beradi." },
  { title: "Uyda qabul qiling", text: "Asal eshigingizgacha yetkaziladi, ko'rib to'laysiz." },
];

export const faq = [
  {
    q: "Asal tabiiy ekanini qanday bilaman?",
    a: "Asallarimiz ishonchli asalarichilardan to'g'ridan-to'g'ri olinadi. Agar asal sizga tabiiy bo'lmagandek tuyulsa — pulingizni qaytaramiz.",
  },
  {
    q: "Yetkazib berish qancha vaqt oladi?",
    a: "Toshkent bo'ylab odatda 1 kun ichida, viloyatlarga 1–3 kun ichida yetkaziladi.",
  },
  {
    q: "To'lov qanday amalga oshiriladi?",
    a: "Asalni qabul qilib olganingizdan so'ng naqd yoki karta orqali to'lashingiz mumkin.",
  },
  {
    q: "Asal shakarlanib qolsa, bu yomonmi?",
    a: "Yo'q. Tabiiy asal vaqt o'tishi bilan kristallanadi — bu uning tabiiyligining belgisi. 40°C dan past haroratda iliq suvda yumshatishingiz mumkin.",
  },
  {
    q: "Qaysi asal turini tanlashni bilmayapman",
    a: "Ariza qoldiring — mutaxassisimiz maqsadingizga (immunitet, bolalar uchun, sovg'a) qarab eng mosini tavsiya qiladi.",
  },
];
