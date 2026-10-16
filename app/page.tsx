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
        🚚 O&apos;zbekiston bo&apos;ylab yetkazib berish<span className="topbar-extra"> · Sifat kafolati · Ko&apos;rib to&apos;laysiz</span>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a href="#" className="logo" aria-label="Safo Asallari">
            <span className="logo-mark" aria-hidden>
              <svg viewBox="0 0 28 32" width="26" height="30">
                <path d="M14 0 28 8v16l-14 8L0 24V8Z" fill="currentColor" />
              </svg>
            </span>
            <span>
              Safo <em>Asallari</em>
            </span>
          </a>
          <nav className="nav">
            <a href="#turlar">Asal turlari</a>
            <a href="#nega-biz">Nega biz</a>
            <a href="#savollar">Savollar</a>
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
              <span className="pill">🐝 Asalarichidan to&apos;g&apos;ridan-to&apos;g&apos;ri</span>
              <h1>
                Shifobaxsh, <span className="gold">100% tabiiy</span> asal — oilangiz sog&apos;lig&apos;i uchun
              </h1>
              <p className="lead">
                Shakar, sirop va qo&apos;shimchasiz. Tog&apos; asalidan tortib bozorda topilmaydigan noyob turlargacha —
                eshigingizgacha yetkazib beramiz.
              </p>

              <ul className="offer-list">
                <li>
                  <Icon name="check" size={20} />
                  <span>
                    <b>Kafolat:</b> tabiiy bo&apos;lmasa — pulingizni to&apos;liq qaytaramiz
                  </span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>
                    <b>Ko&apos;rib to&apos;laysiz:</b> avval asalni tatib ko&apos;ring
                  </span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>
                    <b>Bepul maslahat:</b> sizga mos asalni tanlab beramiz
                  </span>
                </li>
              </ul>

              <div className="hero-actions">
                <a href={phoneHref} className="btn btn-dark btn-lg">
                  <Icon name="phone" size={20} /> Qo&apos;ng&apos;iroq qilish
                </a>
                <a href={telegramLink} className="btn btn-ghost btn-lg" target="_blank" rel="noopener">
                  <Icon name="telegram" size={20} /> Telegram
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
              <span>tabiiy mahsulot</span>
            </div>
            <div>
              <b>12</b>
              <span>viloyatga yetkazish</span>
            </div>
            <div>
              <b>2 900+</b>
              <span>Instagram obunachilari</span>
            </div>
            <div>
              <b>0</b>
              <span>shakar va qo&apos;shimcha</span>
            </div>
          </div>
        </section>

        {/* ===== NEGA BIZ ===== */}
        <section className="section" id="nega-biz">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Nega Safo Asallari?</span>
              <h2>Bozordagi asal bilan farqi — birinchi qoshiqdayoq seziladi</h2>
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
              <span className="eyebrow">Assortiment</span>
              <h2>Har xil va noyob asal turlari</h2>
              <p className="featured-honey">Qirg&apos;iziston shifobaxsh tog&apos; asali</p>
            </div>
          </div>
        </section>

        {/* ===== QANDAY BUYURTMA ===== */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Juda oson</span>
              <h2>3 qadamda asal uyingizda</h2>
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
                <h2>Sifat kafolati — xavfsiz xarid</h2>
                <p>
                  Biz asalimizga ishonamiz. Agar asal sizga tabiiy bo&apos;lmagandek tuyulsa yoki yoqmasa — hech qanday
                  savolsiz pulingizni qaytaramiz. Siz hech narsa yo&apos;qotmaysiz.
                </p>
              </div>
              <a href="#buyurtma" className="btn btn-primary btn-lg">
                Buyurtma berish
              </a>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section section-cream" id="savollar">
          <div className="container narrow">
            <div className="section-head">
              <span className="eyebrow">Savollar</span>
              <h2>Ko&apos;p beriladigan savollar</h2>
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
              <span className="eyebrow light">Kechiktirmang</span>
              <h2>Tabiiy asal — eng yaxshi sovg&apos;a va eng arzon dori</h2>
              <p>Ariza qoldiring, 15 daqiqada aloqaga chiqamiz va sizga mos asalni tanlab beramiz.</p>
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
              Safo <em>Asallari</em>
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
          <p className="copy">© {new Date().getFullYear()} Safo Asallari. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>

      {/* Mobil uchun pastki qotirilgan panel */}
      <div className="mobile-bar">
        <a href={phoneHref} className="btn btn-dark">
          <Icon name="phone" size={18} /> Qo&apos;ng&apos;iroq
        </a>
        <a href="#buyurtma" className="btn btn-primary">
          Buyurtma berish
        </a>
      </div>
    </>
  );
}
