import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import BookingSection from "@/components/BookingSection";
import ContactsSection from "@/components/ContactsSection";

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

export default function Index() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "2", comment: "" });
  const [formSent, setFormSent] = useState(false);

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
      <NavBar
        navScrolled={navScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollTo={scrollTo}
      />
      <HeroSection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        scrollTo={scrollTo}
      />
      <BookingSection
        form={form}
        setForm={setForm}
        formSent={formSent}
        handleSubmit={handleSubmit}
      />
      <ContactsSection scrollTo={scrollTo} />
    </div>
  );
}
