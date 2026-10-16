"use client";

import { FormEvent, useState } from "react";
import { getCookie, getFbc, track } from "./MetaPixel";
import { telegramLink } from "@/lib/site";

// +998 (90) 123-45-67 ko'rinishidagi niqob
function maskPhone(value: string) {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  let out = "+998";
  if (d.length > 0) out += ` (${d.slice(0, 2)}`;
  if (d.length >= 2) out += ")";
  if (d.length > 2) out += ` ${d.slice(2, 5)}`;
  if (d.length > 5) out += `-${d.slice(5, 7)}`;
  if (d.length > 7) out += `-${d.slice(7, 9)}`;
  return out;
}

const newEventId = () =>
  `lead_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export default function LeadForm({ id, compact = false }: { id?: string; compact?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Ismingizni kiriting");
    if (digits.length !== 12) return setError("Telefon raqamni to'liq kiriting");
    if (address.trim().length < 2) return setError("Manzilingizni kiriting");

    setStatus("sending");
    const eventId = newEventId();
    const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: digits,
          address,
          website,
          eventId,
          url: window.location.href,
          fbp: decodeURIComponent(getCookie("_fbp")),
          fbc: getFbc(),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Xatolik yuz berdi");

      // Pixel + CAPI bir xil eventID bilan — Meta takrorni o'zi olib tashlaydi.
      track("Lead", { content_name: "Safo Asallari ariza" }, eventId);
      setStatus("done");
      // Pixel so'rovi chiqib ulgurishi uchun qisqa pauza, so'ng Telegram lichkaga.
      setTimeout(() => {
        window.location.href = telegramLink;
      }, 900);
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    }
  }

  if (status === "done") {
    return (
      <div className={`lead-form lead-done ${compact ? "compact" : ""}`} id={id}>
        <div className="done-icon" aria-hidden>✓</div>
        <h3>Rahmat, {name.split(" ")[0]}!</h3>
        <p>Arizangiz qabul qilindi. Hozir Telegramga o&apos;tasiz — u yerda buyurtmani tasdiqlaymiz.</p>
        <a className="btn btn-primary" href={telegramLink}>
          Telegramni ochish
        </a>
      </div>
    );
  }

  return (
    <form className={`lead-form ${compact ? "compact" : ""}`} id={id} onSubmit={onSubmit} noValidate>
      {!compact && (
        <div className="form-head">
          <span className="pill pill-hot">Bugungi taklif</span>
          <h3>Asal buyurtma qiling</h3>
          <p>Ariza qoldiring — 15 daqiqada aloqaga chiqamiz</p>
        </div>
      )}

      <label className="field">
        <span>Ismingiz</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Masalan: Dilnoza"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>Telefon raqamingiz</span>
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+998 (90) 123-45-67"
          value={phone}
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          required
        />
      </label>

      <label className="field">
        <span>Manzilingiz</span>
        <input
          type="text"
          name="address"
          autoComplete="street-address"
          placeholder="Shahar / tuman, ko'cha"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>

      {/* bot-tuzoq: odamlar ko'rmaydi */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={status === "sending"}>
        {status === "sending" ? <span className="spinner" aria-label="Yuborilmoqda" /> : "Yuborish"}
      </button>

      <p className="form-note">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
          <path
            fill="currentColor"
            d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4Zm-1.2 15.2-3.5-3.5 1.4-1.4 2.1 2.1 4.9-4.9 1.4 1.4-6.3 6.3Z"
          />
        </svg>
        Ma&apos;lumotlaringiz faqat buyurtma uchun ishlatiladi
      </p>
    </form>
  );
}
