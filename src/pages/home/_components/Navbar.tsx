import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    setIsOpen(false);
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

  const navLinkClasses = (item: NavItem, mobile: boolean) => {
    const active = item.type === "page" && location.pathname === item.href;
    if (mobile) {
      return `block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
        active
          ? "text-primary bg-primary/5 font-semibold"
          : "text-foreground hover:bg-secondary"
      }`;
    }
    return `px-2 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap ${
      active
        ? "text-primary font-semibold"
        : "text-foreground/80 hover:text-primary"
    }`;
  };

  const renderNavItem = (item: NavItem, mobile: boolean) =>
    item.type === "page" ? (
      <Link
        key={item.label}
        to={item.href}
        onClick={() => setIsOpen(false)}
        className={navLinkClasses(item, mobile)}
      >
        {item.label}
      </Link>
    ) : (
      <button
        key={item.label}
        onClick={() => scrollToSection(item.href)}
        className={navLinkClasses(item, mobile)}
      >
        {item.label}
      </button>
    );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src="/assets/file_G5Y3AadLPoi80wWKp3JyQ7jt.webp"
              alt="Лого на Хоспис Маринела"
              width={96}
              height={96}
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
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-0">
            {NAV_ITEMS.map((item) => renderNavItem(item, false))}
          </div>

          {/* Contact info + CTA */}
          <div className="hidden xl:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/contact">
                <Phone className="h-4 w-4 mr-1.5" />
                Свържете се
              </Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Затвори менюто" : "Отвори менюто"}
            aria-expanded={isOpen}
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
              {NAV_ITEMS.map((item) => renderNavItem(item, true))}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground flex-wrap">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+359878710501" className="hover:text-primary transition-colors">087 871 05 01</a>
                  <span>/</span>
                  <a href="tel:+359883920422" className="hover:text-primary transition-colors">088 392 04 22</a>
                </div>
                <Button
                  asChild
                  className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Свържете се с нас
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
