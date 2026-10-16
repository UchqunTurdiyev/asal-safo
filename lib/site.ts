// Saytdagi barcha matn va kontaktlar shu yerda — o'zgartirish oson bo'lsin uchun.

export const site = {
  name: "Сафо Асаллари",
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
    title: "100% табиий",
    text: "Шакар, сироп ёки қўшимчасиз. Фақат ари ва табиат.",
  },
  {
    icon: "shield",
    title: "Сифат кафолати",
    text: "Асал ёқмаса ёки табиий бўлмаса — пулингизни тўлиқ қайтарамиз.",
  },
  {
    icon: "truck",
    title: "Бутун Ўзбекистонга",
    text: "Тошкентдан Нукусгача — ҳар бир вилоятга етказиб берамиз.",
  },
  {
    icon: "star",
    title: "Ноёб турлар",
    text: "Бозорда топилмайдиган, кам учрайдиган асал навлари бизда бор.",
  },
];

export const steps = [
  { title: "Ариза қолдиринг", text: "Исм, рақам ва манзилингизни ёзинг — 30 сония." },
  { title: "Маслаҳат олинг", text: "Мутахассисимиз сизга мос асал турини танлаб беради." },
  { title: "Уйда қабул қилинг", text: "Асал эшигингизгача етказилади ёки почта офисларидан олиб кетасиз." },
];

export const faq = [
  {
    q: "Асал табиий эканини қандай биламан?",
    a: "Асалларимиз ишончли асаларичилардан тўғридан-тўғри олинади. Агар асал сизга табиий бўлмагандек туюлса — пулингизни қайтарамиз.",
  },
  {
    q: "Етказиб бериш қанча вақт олади?",
    a: "Тошкент бўйлаб одатда 1 кун ичида, вилоятларга 1–3 кун ичида етказилади.",
  },
  {
    q: "Асал шакарланиб қолса, бу ёмонми?",
    a: "Йўқ. Табиий асал вақт ўтиши билан кристалланади — бу унинг табиийлигининг белгиси. 40°C дан паст ҳароратда илиқ сувда юмшатишингиз мумкин.",
  },
  {
    q: "Қайси асал турини танлашни билмаяпман",
    a: "Ариза қолдиринг — мутахассисимиз мақсадингизга (иммунитет, болалар учун, совға) қараб энг мосини тавсия қилади.",
  },
];
