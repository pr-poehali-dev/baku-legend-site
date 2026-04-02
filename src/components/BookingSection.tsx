interface BookingSectionProps {
  form: { name: string; phone: string; date: string; guests: string; comment: string };
  setForm: (form: { name: string; phone: string; date: string; guests: string; comment: string }) => void;
  formSent: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function BookingSection({ form, setForm, formSent, handleSubmit }: BookingSectionProps) {
  return (
    <section id="booking" className="section-pad" style={{ padding: "6rem 1.5rem", background: "var(--dark-card)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="text-center reveal" style={{ opacity: 0, transform: "translateY(40px)", transition: "all 0.8s ease", marginBottom: "4rem" }}>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Резервация</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--cream)", marginBottom: "1rem" }}>Забронировать столик</h2>
          <div className="deco-line" style={{ margin: "0 auto 1.5rem" }} />
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "14px", color: "rgba(242,234,216,0.5)" }}>Оставьте заявку — мы свяжемся для подтверждения</p>
        </div>

        {formSent ? (
          <div className="text-center reveal" style={{ padding: "4rem", borderRadius: "2px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", color: "var(--gold)", marginBottom: "1rem" }}>✦</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "var(--cream)", marginBottom: "12px" }}>Заявка принята!</h3>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "14px", color: "rgba(242,234,216,0.6)" }}>Мы позвоним вам в течение 30 минут для подтверждения брони.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="reveal"
            style={{
              padding: "2.5rem",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(201,168,76,0.15)",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "all 0.8s ease 0.2s",
              boxSizing: "border-box" as const,
            }}
          >
            <div className="booking-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {[
                { label: "Ваше имя", type: "text", key: "name", placeholder: "Иван Иванов" },
                { label: "Телефон", type: "tel", key: "phone", placeholder: "+7 (978) 000-00-00" },
                { label: "Дата", type: "date", key: "date", placeholder: "" },
                { label: "Количество гостей", type: "number", key: "guests", placeholder: "2" },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "8px" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    style={{
                      width: "100%",
                      fontFamily: "'Golos Text', sans-serif",
                      fontSize: "14px",
                      padding: "12px 16px",
                      borderRadius: "2px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "var(--cream)",
                      outline: "none",
                      colorScheme: "dark",
                      transition: "border-color 0.3s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--gold)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(201,168,76,0.2)"; }}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <label style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "8px" }}>
                Пожелания
              </label>
              <textarea
                rows={3}
                placeholder="Особые пожелания, аллергии, повод..."
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                style={{
                  width: "100%",
                  fontFamily: "'Golos Text', sans-serif",
                  fontSize: "14px",
                  padding: "12px 16px",
                  borderRadius: "2px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: "var(--cream)",
                  outline: "none",
                  resize: "none",
                  transition: "border-color 0.3s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--gold)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(201,168,76,0.2)"; }}
              />
            </div>
            <div className="text-center" style={{ marginTop: "2rem" }}>
              <button type="submit" className="btn-gold rounded-sm" style={{ padding: "1rem 3.5rem", fontSize: "13px" }}>
                Отправить заявку
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
