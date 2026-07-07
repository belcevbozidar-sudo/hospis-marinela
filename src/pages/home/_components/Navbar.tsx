import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Phone, Menu, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";

type NavItem = {
  label: string;
  href: string;
  type: "page" | "section";
};

const NAV_ITEMS: NavItem[] = [
  { label: "Начало", href: "/", type: "page" },
  { label: "За нас", href: "/about", type: "page" },
  { label: "Услуги", href: "/services", type: "page" },
  { label: "Прием", href: "/admission", type: "page" },
  { label: "Цени", href: "/prices", type: "page" },
  { label: "Условия", href: "#conditions", type: "section" },
  { label: "Екип", href: "/team", type: "page" },
  { label: "Галерия", href: "/gallery", type: "page" },
  { label: "Отзиви", href: "/reviews", type: "page" },
  { label: "Контакти", href: "/contact", type: "page" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (hash: string) => {
    if (location.pathname === "/") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleNavClick = (item: NavItem) => {
    setIsOpen(false);

    if (item.type === "page") {
      navigate(item.href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToSection(item.href);
    }
  };

  const handleContactClick = () => {
    setIsOpen(false);
    navigate("/contact");
    window.scrollTo({ top: 0 });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="/assets/file_G5Y3AadLPoi80wWKp3JyQ7jt"
              alt="Хоспис Маринела"
              loading="eager"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <p className="font-serif text-lg font-bold text-primary leading-tight">
                {"Хоспис \"Маринела\""}
              </p>
              <p className="text-xs text-muted-foreground">
                Домът на нашите пациенти
              </p>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-0">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`px-2 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap ${
                  item.type === "page" && location.pathname === item.href
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact info + CTA */}
          <div className="hidden xl:flex items-center gap-3">
            <Button
              size="sm"
              onClick={handleContactClick}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Phone className="h-4 w-4 mr-1.5" />
              Свържете се
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-foreground cursor-pointer"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white/70 backdrop-blur-xl border-b border-white/20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    item.type === "page" && location.pathname === item.href
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground flex-wrap">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+359878710501" className="hover:text-primary transition-colors">087 871 05 01</a>
                  <span>/</span>
                  <a href="tel:+359883920422" className="hover:text-primary transition-colors">088 392 04 22</a>
                </div>
                <Button
                  className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleContactClick}
                >
                  Свържете се с нас
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
