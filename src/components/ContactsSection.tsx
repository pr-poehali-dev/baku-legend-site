import Icon from "@/components/ui/icon";

interface ContactsSectionProps {
  scrollTo: (id: string) => void;
}

export default function ContactsSection({ scrollTo }: ContactsSectionProps) {
  return (
    <>
      {/* CONTACTS */}
      <section id="contacts" className="section-pad" style={{ padding: "6rem 1.5rem", background: "var(--dark)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="text-center reveal" style={{ opacity: 0, transform: "translateY(40px)", transition: "all 0.8s ease", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Как нас найти</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "var(--cream)", marginBottom: "1rem" }}>Контакты</h2>
            <div className="deco-line" style={{ margin: "0 auto" }} />
          </div>

          <div className="contacts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { icon: "MapPin", title: "Адрес", lines: ["г. Севастополь", "ул. Айвазовского, 3"] },
              { icon: "Phone", title: "Телефон", lines: ["+7 (978) 601-27-39", "Принимаем звонки ежедневно"] },
              { icon: "Clock", title: "Режим работы", lines: ["Ежедневно", "с 11:00 до 23:00"] },
            ].map((item, i) => (
              <div
                key={i}
                className="card-hover reveal"
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: "2px",
                  opacity: 0,
                  transform: "translateY(40px)",
                  transition: `all 0.8s ease ${i * 0.15}s`,
                }}
              >
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <Icon name={item.icon} size={20} style={{ color: "var(--gold)" }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "var(--cream)", marginBottom: "12px" }}>{item.title}</h3>
                {item.lines.map((line) => (
                  <p key={line} style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "14px", color: "rgba(242,234,216,0.6)", lineHeight: 1.8 }}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div
            className="reveal"
            style={{
              borderRadius: "2px",
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.15)",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=33.519934,44.612542&z=17&pt=33.519934,44.612542,pm2rdm"
              width="100%"
              height="320"
              allowFullScreen
              style={{ border: "none", display: "block", filter: "grayscale(50%) brightness(0.8)" }}
              title="Карта"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2.5rem 1.5rem", background: "var(--dark-card)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="footer-inner" style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--gold)" }}>Легенды Баку</div>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "rgba(242,234,216,0.4)", marginTop: "4px" }}>Ресторан азербайджанской кухни · Севастополь</p>
          </div>
          <div className="footer-links" style={{ display: "flex", gap: "2rem" }}>
            {[["menu", "Меню"], ["gallery", "Галерея"], ["booking", "Бронь"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", background: "none", border: "none", cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "rgba(242,234,216,0.3)" }}>© 2025 Легенды Баку</p>
        </div>
      </footer>
    </>
  );
}
