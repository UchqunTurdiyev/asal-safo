import HoneyJar from "@/components/HoneyJar";
import Icon from "@/components/Icons";
import LeadForm from "@/components/LeadForm";
import {
  benefits,
  faq,
  formatPhone,
  instagramLink,
  phoneHref,
  site,
  steps,
  telegramLink,
} from "@/lib/site";

export default function Home() {
  const phoneLabel = formatPhone(site.phone);

  return (
    <>
      <div className="topbar">
        🚚 Ўзбекистон бўйлаб етказиб бериш<span className="topbar-extra"> · Сифат кафолати · Кўриб тўлайсиз</span>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a href="#" className="logo" aria-label="Сафо Асаллари">
            <span className="logo-mark" aria-hidden>
              <svg viewBox="0 0 28 32" width="26" height="30">
                <path d="M14 0 28 8v16l-14 8L0 24V8Z" fill="currentColor" />
              </svg>
            </span>
            <span>
              Сафо <em>Асаллари</em>
            </span>
          </a>
          <nav className="nav">
            <a href="#turlar">Асал турлари</a>
            <a href="#nega-biz">Нега биз</a>
            <a href="#savollar">Саволлар</a>
          </nav>
          <a href={phoneHref} className="btn btn-ghost header-call">
            <Icon name="phone" size={18} />
            <span>{phoneLabel}</span>
          </a>
        </div>
      </header>

      <main>
        {/* ===== HERO + TAKLIF + FORMA ===== */}
        <section className="hero">
          <div className="hero-glow" aria-hidden />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="pill">🐝 Асаларичидан тўғридан-тўғри</span>
              <h1>
                Шифобахш, <span className="gold">100% табиий</span> асал — оилангиз соғлиғи учун
              </h1>
              <p className="lead">
                Шакар, сироп ва қўшимчасиз. Тоғ асалидан тортиб бозорда топилмайдиган ноёб турларгача —
                эшигингизгача етказиб берамиз.
              </p>

              <ul className="offer-list">
                <li>
                  <Icon name="check" size={20} />
                  <span>
                    <b>Кафолат:</b> табиий бўлмаса — пулингизни тўлиқ қайтарамиз
                  </span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>
                    <b>Кўриб тўлайсиз:</b> аввал асални татиб кўринг
                  </span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>
                    <b>Бепул маслаҳат:</b> сизга мос асални танлаб берамиз
                  </span>
                </li>
              </ul>

              <div className="hero-actions">
                <a href={phoneHref} className="btn btn-dark btn-lg">
                  <Icon name="phone" size={20} /> Қўнғироқ қилиш
                </a>
                <a href={telegramLink} className="btn btn-ghost btn-lg" target="_blank" rel="noopener">
                  <Icon name="telegram" size={20} /> Телеграм
                </a>
              </div>
            </div>

            <div className="hero-form-wrap">
              <div className="hero-jar" aria-hidden>
                <HoneyJar />
              </div>
              <LeadForm id="buyurtma" />
            </div>
          </div>

          <div className="container stats">
            <div>
              <b>100%</b>
              <span>табиий маҳсулот</span>
            </div>
            <div>
              <b>12</b>
              <span>вилоятга етказиш</span>
            </div>
            <div>
              <b>2 900+</b>
              <span>Инстаграм обуначилари</span>
            </div>
            <div>
              <b>0</b>
              <span>шакар ва қўшимча</span>
            </div>
          </div>
        </section>

        {/* ===== NEGA BIZ ===== */}
        <section className="section" id="nega-biz">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Нега Сафо Асаллари?</span>
              <h2>Бозордаги асал билан фарқи — биринчи қошиқдаёқ сезилади</h2>
            </div>
            <div className="benefits">
              {benefits.map((b) => (
                <article key={b.title} className="benefit">
                  <div className="benefit-icon">
                    <Icon name={b.icon} size={26} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ASAL TURLARI ===== */}
        <section className="section section-cream" id="turlar">
          <div className="container">
            <div className="section-head section-head-only">
              <span className="eyebrow">Ассортимент</span>
              <h2>Ҳар хил ва ноёб асал турлари</h2>
              <p className="featured-honey">Қирғизистон шифобахш тоғ асали</p>
            </div>
          </div>
        </section>

        {/* ===== QANDAY BUYURTMA ===== */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Жуда осон</span>
              <h2>3 қадамда асал уйингизда</h2>
            </div>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step-num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== KAFOLAT ===== */}
        <section className="section">
          <div className="container">
            <div className="guarantee">
              <div className="guarantee-seal" aria-hidden>
                <Icon name="shield" size={54} />
              </div>
              <div>
                <h2>Сифат кафолати — хавфсиз харид</h2>
                <p>
                  Биз асалимизга ишонамиз. Агар асал сизга табиий бўлмагандек туюлса ёки ёқмаса — ҳеч қандай
                  саволсиз пулингизни қайтарамиз. Сиз ҳеч нарса йўқотмайсиз.
                </p>
              </div>
              <a href="#buyurtma" className="btn btn-primary btn-lg">
                Буюртма бериш
              </a>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section section-cream" id="savollar">
          <div className="container narrow">
            <div className="section-head">
              <span className="eyebrow">Саволлар</span>
              <h2>Кўп бериладиган саволлар</h2>
            </div>
            <div className="faq">
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== YAKUNIY CTA ===== */}
        <section className="final">
          <div className="container final-grid">
            <div>
              <span className="eyebrow light">Кечиктирманг</span>
              <h2>Табиий асал — энг яхши совға ва энг арзон дори</h2>
              <p>Ариза қолдиринг — тез орада асал соҳасидаги мутахассисимиз сиз билан боғланиб, сизга мос асални танлаб беради.</p>
              <div className="hero-actions">
                <a href={phoneHref} className="btn btn-primary btn-lg">
                  <Icon name="phone" size={20} /> {phoneLabel}
                </a>
              </div>
            </div>
            <LeadForm compact />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="logo">
            <span className="logo-mark" aria-hidden>
              <svg viewBox="0 0 28 32" width="22" height="26">
                <path d="M14 0 28 8v16l-14 8L0 24V8Z" fill="currentColor" />
              </svg>
            </span>
            <span>
              Сафо <em>Асаллари</em>
            </span>
          </div>
          <div className="socials">
            <a href={instagramLink} target="_blank" rel="noopener" aria-label="Instagram">
              <Icon name="instagram" size={20} /> @{site.instagram}
            </a>
            <a href={telegramLink} target="_blank" rel="noopener" aria-label="Telegram">
              <Icon name="telegram" size={20} /> @{site.telegram}
            </a>
            <a href={phoneHref}>
              <Icon name="phone" size={20} /> {phoneLabel}
            </a>
          </div>
          <p className="copy">© {new Date().getFullYear()} Сафо Асаллари. Барча ҳуқуқлар ҳимояланган.</p>
        </div>
      </footer>

      {/* Mobil uchun pastki qotirilgan panel */}
      <div className="mobile-bar">
        <a href={phoneHref} className="btn btn-dark">
          <Icon name="phone" size={18} /> Қўнғироқ
        </a>
        <a href="#buyurtma" className="btn btn-primary">
          Буюртма бериш
        </a>
      </div>
    </>
  );
}
