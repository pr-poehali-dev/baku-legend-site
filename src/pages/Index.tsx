import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const LULA_IMG = "https://cdn.poehali.dev/projects/2d8f79af-5f59-4784-b8f6-e0e8ac5ea696/files/a2971bb1-fd52-43b8-ac15-f44d3f74b5fd.jpg";
const PLOV_IMG = "https://cdn.poehali.dev/projects/2d8f79af-5f59-4784-b8f6-e0e8ac5ea696/files/105ad56e-2eb0-4ce1-81e7-c0648f5e852a.jpg";
const SHASHLIK_IMG = "https://cdn.poehali.dev/projects/2d8f79af-5f59-4784-b8f6-e0e8ac5ea696/files/af1ccd9d-4c15-458b-9b72-1cafc152db63.jpg";
const DOVGA_IMG = "https://cdn.poehali.dev/projects/2d8f79af-5f59-4784-b8f6-e0e8ac5ea696/files/9ec33ca0-90a9-4b11-8413-01dafe06e5dd.jpg";

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0) translateX(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const menuCategories = [
  {
    name: "Мангал",
    items: [
      { name: "Люля-кебаб из баранины", desc: "Рубленый фарш с зеленью, лук, перец, жареный на мангале", price: "850 ₽" },
      { name: "Шашлык из баранины", desc: "Маринованная корейка молодого ягнёнка, томаты, зира", price: "850 ₽" },
      { name: "Шашлык каре баранины", desc: "Отборные рёбрышки молодого ягнёнка на мангале", price: "950 ₽" },
      { name: "Шашлык из говядины", desc: "Вырезка, маринованная в гранатовом соке и специях", price: "850 ₽" },
      { name: "Аджап-сандал", desc: "Овощное блюдо с баклажанами, перцем и помидорами на мангале", price: "850 ₽" },
    ],
  },
  {
    name: "Плов",
    items: [
      { name: "Шах-плов", desc: "Азербайджанский плов в лаваше с бараниной, каштанами и сухофруктами", price: "850 ₽" },
      { name: "Азербайджанский плов", desc: "Традиционный плов с шафраном, бараниной и зеленью", price: "750 ₽" },
      { name: "Бакинский плов", desc: "Рассыпчатый рис с сухофруктами и нежной бараниной", price: "750 ₽" },
    ],
  },
  {
    name: "Закуски",
    items: [
      { name: "Кюфта-бозбаш", desc: "Суп с фрикадельками из баранины, нут, картофель", price: "850 ₽" },
      { name: "Дюшбара", desc: "Азербайджанские пельмени с бараниной в бульоне", price: "850 ₽" },
      { name: "Долма", desc: "Виноградные листья с рисом и ягнятиной, мацони", price: "750 ₽" },
      { name: "Пахлава", desc: "Медовая слоёная выпечка с орехами, шафран", price: "280 ₽" },
      { name: "Довга", desc: "Традиционный йогуртовый суп со шпинатом, рисом и свежей мятой", price: "250 ₽" },
    ],
  },
];

const reviews = [
  {
    name: "Алина К.",
    date: "Февраль 2025",
    rating: 5,
    text: "Лучший люля-кебаб в Севастополе, без преувеличений. Атмосфера восточная, персонал приветливый. Будем возвращаться снова.",
  },
  {
    name: "Дмитрий М.",
    date: "Январь 2025",
    rating: 5,
    text: "Шах-плов — это шедевр! Баранина тает во рту, сухофрукты придают неповторимый вкус. Порции щедрые, цены адекватные.",
  },
  {
    name: "Марина Р.",
    date: "Март 2025",
    rating: 5,
    text: "Атмосфера как в Баку. Тихая музыка, вкуснейшая долма и чай в армудах. Рекомендую всем любителям восточной кухни.",
  },
];

const galleryImages = [
  { src: LULA_IMG, title: "Люля-кебаб" },
  { src: PLOV_IMG, title: "Шах-плов" },
  { src: SHASHLIK_IMG, title: "Шашлык" },
  { src: DOVGA_IMG, title: "Довга" },
];

export default function Index() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "2", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--dark)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
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
            {/* Mobile hamburger */}
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
        {/* Mobile dropdown */}
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

      {/* HERO */}
      <section id="hero" ref={heroRef} className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh" }}>
        {/* Background mosaic */}
        <div className="absolute inset-0 hero-mosaic" style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
          <div className="relative overflow-hidden">
            <img src={SHASHLIK_IMG} alt="Шашлык" className="w-full h-full object-cover" style={{ transform: "scale(1.05)", filter: "brightness(0.3)" }} />
          </div>
          <div className="hero-mosaic-side" style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}>
            <div className="relative overflow-hidden">
              <img src={LULA_IMG} alt="Лула-кебаб" className="w-full h-full object-cover" style={{ filter: "brightness(0.3)" }} />
            </div>
            <div className="relative overflow-hidden">
              <img src={PLOV_IMG} alt="Плов" className="w-full h-full object-cover" style={{ filter: "brightness(0.3)" }} />
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(12,10,8,0.88) 0%, rgba(139,26,42,0.2) 50%, rgba(12,10,8,0.92) 100%)" }} />
        {/* Vertical decorations */}
        <div className="absolute" style={{ top: "25%", left: "3rem", width: "1px", height: "8rem", background: "linear-gradient(to bottom, transparent, var(--gold), transparent)", opacity: 0.3 }} />
        <div className="absolute" style={{ top: "25%", right: "3rem", width: "1px", height: "8rem", background: "linear-gradient(to bottom, transparent, var(--gold), transparent)", opacity: 0.3 }} />

        {/* Content */}
        <div className="relative z-10 text-center px-6" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
            <div className="ornament mb-6" style={{ maxWidth: "280px", margin: "0 auto 24px" }}>
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>
                Азербайджанская кухня
              </span>
            </div>
          </div>

          <h1 className="animate-fade-up opacity-0" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 700, lineHeight: 0.9, marginBottom: "1.5rem", animationDelay: "0.4s" }}>
            <span style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>Легенды</span>
            <span style={{ color: "var(--cream)", display: "block" }}>Баку</span>
          </h1>

          <p className="animate-fade-up opacity-0" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.7, color: "rgba(242,234,216,0.7)", animationDelay: "0.6s" }}>
            Подлинные вкусы Азербайджана в сердце Севастополя.<br />
            Люля-кебаб, плов, шашлык — по традиционным рецептам.
          </p>

          <div className="animate-fade-up opacity-0" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animationDelay: "0.8s" }}>
            <button onClick={() => scrollTo("booking")} className="btn-gold rounded-sm" style={{ padding: "1rem 2.5rem", fontSize: "13px" }}>
              Забронировать столик
            </button>
            <button
              onClick={() => scrollTo("menu")}
              style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1rem 2.5rem", borderRadius: "2px", border: "1px solid rgba(201,168,76,0.4)", color: "var(--cream)", background: "transparent", cursor: "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.4)"; }}
            >
              Смотреть меню
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade-up opacity-0" style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: "420px", margin: "4rem auto 0", animationDelay: "1s" }}>
            {[["15+", "лет традиций"], ["60+", "блюд в меню"], ["5.0 ★", "рейтинг"]].map(([num, label]) => (
              <div key={num} className="text-center">
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "var(--gold)" }}>{num}</div>
                <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.05em", marginTop: "4px", color: "rgba(242,234,216,0.5)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute animate-float" style={{ bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)" }}>Листайте</span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="section-pad" style={{ padding: "6rem 1.5rem", background: "var(--dark-card)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="text-center reveal" style={{ opacity: 0, transform: "translateY(40px)", transition: "all 0.8s ease", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Наше предложение</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "var(--cream)", marginBottom: "1rem" }}>Меню</h2>
            <div className="deco-line" style={{ margin: "0 auto" }} />
          </div>

          {/* Category tabs */}
          <div className="reveal" style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.8s ease 0.2s", display: "flex", justifyContent: "center", gap: "8px", marginBottom: "3rem", flexWrap: "wrap" }}>
            {menuCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                style={{
                  fontFamily: "'Golos Text', sans-serif",
                  fontSize: "14px",
                  padding: "10px 24px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: activeCategory === i ? "var(--gold)" : "transparent",
                  color: activeCategory === i ? "var(--dark)" : "var(--cream)",
                  border: `1px solid ${activeCategory === i ? "var(--gold)" : "rgba(201,168,76,0.3)"}`,
                  fontWeight: activeCategory === i ? 600 : 400,
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="menu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "1rem" }}>
            {menuCategories[activeCategory].items.map((item, i) => (
              <div
                key={item.name + i}
                className="card-hover"
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: "2px",
                }}
              >
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "var(--cream)", marginBottom: "6px" }}>{item.name}</h3>
                  <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "rgba(242,234,216,0.55)", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--gold)" }}>{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "rgba(242,234,216,0.4)", marginTop: "2rem" }}>
            Полное меню доступно в ресторане. Уточняйте наличие блюд у официантов.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section-pad" style={{ padding: "6rem 1.5rem", background: "var(--dark)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="text-center reveal" style={{ opacity: 0, transform: "translateY(40px)", transition: "all 0.8s ease", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Наши блюда</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "var(--cream)", marginBottom: "1rem" }}>Галерея</h2>
            <div className="deco-line" style={{ margin: "0 auto" }} />
          </div>

          <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="img-overlay card-hover reveal"
                style={{
                  borderRadius: "2px",
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: "3/4",
                  opacity: 0,
                  transform: "translateY(40px)",
                  transition: `all 0.8s ease ${i * 0.15}s`,
                }}
              >
                <img src={img.src} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.08)"; }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", zIndex: 10 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--cream)" }}>{img.title}</h3>
                  <div style={{ width: "2rem", height: "1px", marginTop: "8px", background: "var(--gold)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad" style={{ padding: "6rem 1.5rem", background: "var(--dark-card)" }}>
        <div className="about-grid" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div className="reveal" style={{ opacity: 0, transform: "translateX(-40px)", transition: "all 0.9s ease" }}>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>Наша история</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--cream)", lineHeight: 1.1, marginBottom: "2rem" }}>
              Вкус <span style={{ color: "var(--gold)" }}>Баку</span><br />в Севастополе
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", fontFamily: "'Golos Text', sans-serif", fontSize: "15px", lineHeight: 1.8, color: "rgba(242,234,216,0.7)" }}>
              <p>Ресторан «Легенды Баку» открылся в Севастополе более 15 лет назад и стал настоящим посольством азербайджанской кулинарной культуры на черноморском берегу.</p>
              <p>Наш шеф-повар привёз рецепты, передававшиеся в семье через поколения — аутентичный люля-кебаб, шах-плов с каштанами и сухофруктами, нежная долма в виноградных листьях.</p>
              <p>Каждое блюдо — это путешествие в Баку: пряный аромат шафрана, живой огонь мангала и тёплое гостеприимство Востока.</p>
            </div>
            <div className="about-features" style={{ marginTop: "2.5rem", display: "flex", gap: "2rem" }}>
              {[["Традиционные рецепты", "По семейным рецептам"], ["Живой мангал", "Настоящий огонь, дым, аромат"]].map(([title, desc]) => (
                <div key={title}>
                  <div style={{ width: "2rem", height: "1px", marginBottom: "12px", background: "var(--gold)" }} />
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--cream)", marginBottom: "4px" }}>{title}</h4>
                  <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "13px", color: "rgba(242,234,216,0.5)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal about-image-wrap" style={{ opacity: 0, transform: "translateX(40px)", transition: "all 0.9s ease 0.2s", position: "relative" }}>
            <div style={{ position: "absolute", top: "-16px", left: "-16px", width: "100%", height: "100%", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px", zIndex: 0 }} />
            <img src={PLOV_IMG} alt="Атмосфера ресторана" style={{ position: "relative", width: "100%", borderRadius: "2px", objectFit: "cover", aspectRatio: "4/5", filter: "brightness(0.85)", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: "-24px", right: "-24px", borderRadius: "2px", padding: "1.5rem", zIndex: 10, background: "var(--dark)", border: "1px solid rgba(201,168,76,0.3)" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 700, color: "var(--gold)" }}>15+</div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.05em", marginTop: "4px", color: "rgba(242,234,216,0.7)" }}>лет традиций</div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="section-pad" style={{ padding: "6rem 1.5rem", background: "var(--dark)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="text-center reveal" style={{ opacity: 0, transform: "translateY(40px)", transition: "all 0.8s ease", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>Мнения гостей</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "var(--cream)", marginBottom: "1rem" }}>Отзывы</h2>
            <div className="deco-line" style={{ margin: "0 auto" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {reviews.map((review, i) => (
              <div
                key={i}
                className="card-hover reveal"
                style={{
                  padding: "2rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: "2px",
                  opacity: 0,
                  transform: "translateY(40px)",
                  transition: `all 0.8s ease ${i * 0.15}s`,
                }}
              >
                <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} style={{ color: "var(--gold)", fontSize: "14px" }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "14px", lineHeight: 1.7, color: "rgba(242,234,216,0.75)", marginBottom: "1.5rem" }}>
                  «{review.text}»
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, background: "rgba(201,168,76,0.15)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)" }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--cream)" }}>{review.name}</div>
                    <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "12px", color: "rgba(242,234,216,0.4)" }}>{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
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
              src="https://yandex.ru/map-widget/v1/?ll=33.526201,44.616510&z=15&pt=33.526201,44.616510,pm2rdm"
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
    </div>
  );
}