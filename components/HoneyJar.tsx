// Hero uchun dekorativ asal bankasi (SVG) — rasm kerak emas, har qanday ekranda tiniq.
export default function HoneyJar() {
  return (
    <svg className="jar" viewBox="0 0 320 400" role="img" aria-label="Safo Asallari — asal bankasi">
      <defs>
        <linearGradient id="honey" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD27A" />
          <stop offset=".45" stopColor="#F2A62B" />
          <stop offset="1" stopColor="#B4620A" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".2" stopColor="#fff" stopOpacity=".05" />
          <stop offset=".85" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5A3412" />
          <stop offset="1" stopColor="#2E1A08" />
        </linearGradient>
        <pattern id="comb" width="28" height="48.5" patternUnits="userSpaceOnUse" patternTransform="scale(.6)">
          <path
            d="M14 0 28 8.1v16.2L14 32.3 0 24.3V8.1ZM14 32.3v16.2M0 48.5"
            fill="none"
            stroke="#fff"
            strokeOpacity=".14"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>

      {/* soya */}
      <ellipse cx="160" cy="384" rx="120" ry="12" fill="#000" opacity=".25" />

      {/* banka */}
      <path
        d="M70 110h180c14 0 24 10 24 24v210c0 22-18 40-40 40H86c-22 0-40-18-40-40V134c0-14 10-24 24-24Z"
        fill="url(#honey)"
      />
      <path
        d="M70 110h180c14 0 24 10 24 24v210c0 22-18 40-40 40H86c-22 0-40-18-40-40V134c0-14 10-24 24-24Z"
        fill="url(#comb)"
      />
      <path
        d="M70 110h180c14 0 24 10 24 24v210c0 22-18 40-40 40H86c-22 0-40-18-40-40V134c0-14 10-24 24-24Z"
        fill="url(#glass)"
      />

      {/* qopqoq */}
      <rect x="62" y="62" width="196" height="56" rx="14" fill="url(#lid)" />
      <rect x="62" y="62" width="196" height="10" rx="5" fill="#fff" opacity=".1" />
      <path d="M62 104h196" stroke="#000" strokeOpacity=".2" strokeWidth="2" />

      {/* oqib tushayotgan asal */}
      <path
        className="drip"
        d="M96 112c0 18 6 26 6 38 0 9-6 9-6 0 0-14-12-14-12-26v-12Zm70 0c0 26 8 34 8 50 0 12-8 12-8 0 0-18-14-22-14-38v-12Zm62 0c0 14 5 20 5 30 0 8-5 8-5 0 0-12-10-12-10-22v-8Z"
        fill="#F2A62B"
      />

      {/* yorliq */}
      <g transform="translate(160 262)">
        <rect x="-92" y="-56" width="184" height="112" rx="16" fill="#FFF8EC" />
        <rect x="-84" y="-48" width="168" height="96" rx="11" fill="none" stroke="#C77A12" strokeWidth="1.5" strokeDasharray="3 4" />
        <text y="-14" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="30" fontWeight="700" fill="#2E1A08">
          Safo
        </text>
        <text y="14" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="13" letterSpacing="5" fontWeight="700" fill="#C77A12">
          ASALLARI
        </text>
        <text y="36" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" letterSpacing="1.5" fill="#6B4A28">
          100% TABIIY
        </text>
      </g>

      {/* yaltiroq chiziq */}
      <rect x="66" y="140" width="10" height="200" rx="5" fill="#fff" opacity=".28" />
    </svg>
  );
}
