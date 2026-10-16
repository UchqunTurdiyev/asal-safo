"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie, getFbc, track } from "./MetaPixel";

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
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Исмингизни киритинг");
    if (digits.length !== 12) return setError("Телефон рақамни тўлиқ киритинг");
    if (address.trim().length < 2) return setError("Манзилингизни киритинг");

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
      if (!res.ok || !json.ok) throw new Error(json.error || "Хатолик юз берди");

      // Pixel + CAPI bir xil eventID bilan — Meta takrorni o'zi olib tashlaydi.
      track("Lead", { content_name: "Safo Asallari ariza" }, eventId);
      // Rahmat sahifasi — u yerdan 10 soniyadan so'ng Telegram lichkaga o'tiladi.
      router.push(`/thanks?name=${encodeURIComponent(name.trim())}`);
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Хатолик юз берди");
    }
  }

  return (
    <form className={`lead-form ${compact ? "compact" : ""}`} id={id} onSubmit={onSubmit} noValidate>
      {!compact && (
        <div className="form-head">
          <span className="pill pill-hot">Бугунги таклиф</span>
          <h3>Асал буюртма қилинг</h3>
          <p>Ариза қолдиринг — тез орада асал соҳасидаги мутахассисимиз сиз билан боғланади</p>
        </div>
      )}

      <label className="field">
        <span>Исмингиз</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Масалан: Дилноза"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>Телефон рақамингиз</span>
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
        <span>Манзилингиз</span>
        <input
          type="text"
          name="address"
          autoComplete="street-address"
          placeholder="Шаҳар / туман, кўча"
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
        {status === "sending" ? <span className="spinner" aria-label="Юборилмоқда" /> : "Юбориш"}
      </button>

      <p className="form-note">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
          <path
            fill="currentColor"
            d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4Zm-1.2 15.2-3.5-3.5 1.4-1.4 2.1 2.1 4.9-4.9 1.4 1.4-6.3 6.3Z"
          />
        </svg>
        Маълумотларингиз фақат буюртма учун ишлатилади
      </p>
    </form>
  );
}
