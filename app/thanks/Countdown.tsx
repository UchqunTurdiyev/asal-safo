"use client";

import { useEffect, useState } from "react";
import { telegramLink } from "@/lib/site";

const R = 52;
const CIRC = 2 * Math.PI * R;

export default function Countdown({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const rest = Math.max(0, seconds - Math.floor((Date.now() - start) / 1000));
      setLeft(rest);
      if (rest === 0) {
        clearInterval(timer);
        window.location.href = telegramLink;
      }
    }, 200);
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div className="countdown">
      <div className="countdown-ring" role="timer" aria-live="polite">
        <svg viewBox="0 0 120 120" aria-hidden>
          <circle className="ring-track" cx="60" cy="60" r={R} />
          <circle
            className="ring-progress"
            cx="60"
            cy="60"
            r={R}
            strokeDasharray={CIRC}
            style={{ animationDuration: `${seconds}s`, ["--circ" as string]: CIRC }}
          />
        </svg>
        <span key={left} className="countdown-num">
          {left}
        </span>
      </div>
      <p className="countdown-note">сониядан сўнг Телеграмга ўтасиз</p>
      <a className="btn btn-primary btn-lg btn-block" href={telegramLink}>
        Ҳозир Телеграмга ўтиш
      </a>
    </div>
  );
}
