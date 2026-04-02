interface NavBarProps {
  navScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ navScrolled, mobileMenuOpen, setMobileMenuOpen, scrollTo }: NavBarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: navScrolled ? "rgba(12,10,8,0.96)" : "transparent",
        backdropFilter: navScrolled ? "blur(20px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col leading-none cursor-pointer" onClick={() => scrollTo("hero")}>
          <span className="font-display text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", background: "linear-gradient(135deg, var(--gold), var(--gold-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Легенды Баку
          </span>
          <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.7 }}>
            Севастополь
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[["hero", "Главная"], ["menu", "Меню"], ["gallery", "Галерея"], ["about", "О нас"], ["reviews", "Отзывы"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-link" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "14px", letterSpacing: "0.05em", background: "none", border: "none", cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => scrollTo("booking")} className="btn-gold px-5 py-2.5 rounded-sm hidden md:block" style={{ fontSize: "13px" }}>
            Забронировать
          </button>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{ display: "block", width: "22px", height: "1.5px", background: mobileMenuOpen ? "var(--gold)" : "var(--cream)", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "1.5px", background: "var(--gold)", transition: "all 0.3s", opacity: mobileMenuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "1.5px", background: mobileMenuOpen ? "var(--gold)" : "var(--cream)", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div style={{ background: "rgba(12,10,8,0.98)", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "1rem 1.5rem 1.5rem" }}>
          {[["hero", "Главная"], ["menu", "Меню"], ["gallery", "Галерея"], ["about", "О нас"], ["reviews", "Отзывы"], ["contacts", "Контакты"]].map(([id, label]) => (
            <button key={id} onClick={() => { scrollTo(id); setMobileMenuOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", fontFamily: "'Golos Text', sans-serif", fontSize: "16px", color: "var(--cream)", background: "none", border: "none", borderBottom: "1px solid rgba(201,168,76,0.08)", cursor: "pointer" }}>
              {label}
            </button>
          ))}
          <button onClick={() => { scrollTo("booking"); setMobileMenuOpen(false); }} className="btn-gold rounded-sm w-full mt-4" style={{ padding: "12px", fontSize: "13px" }}>
            Забронировать столик
          </button>
        </div>
      )}
    </nav>
  );
}
