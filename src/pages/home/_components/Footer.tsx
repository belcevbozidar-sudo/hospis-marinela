import { Phone, MapPin, Heart, Facebook } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

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

  const goToPage = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 bg-[oklch(0.25_0.06_150)] text-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/file_G5Y3AadLPoi80wWKp3JyQ7jt"
                alt="Хоспис Маринела"
                className="h-10 w-auto object-contain"
              />
              <div>
                <p className="font-serif text-lg font-bold text-white leading-tight">
                  {"Хоспис \"Маринела\""}
                </p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Домът на нашите пациенти. Отговорна и денонощна грижа с най-високи
              медицински стандарти.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white">
              Навигация
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => goToPage("/")}
                className="block text-sm text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                Начало
              </button>
              <button
                onClick={() => goToPage("/about")}
                className="block text-sm text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                За нас
              </button>
              <button
                onClick={() => goToPage("/services")}
                className="block text-sm text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                Услуги
              </button>
              <button
                onClick={() => goToPage("/admission")}
                className="block text-sm text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                Прием
              </button>
              <button
                onClick={() => goToPage("/prices")}
                className="block text-sm text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                Цени
              </button>
              <button
                onClick={() => scrollToSection("#conditions")}
                className="block text-sm text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                Условия
              </button>
              <button
                onClick={() => goToPage("/team")}
                className="block text-sm text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                Екип
              </button>
              <button
                onClick={() => goToPage("/reviews")}
                className="block text-sm text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                Отзиви
              </button>
              <button
                onClick={() => goToPage("/contact")}
                className="block text-sm text-white/70 hover:text-accent transition-colors cursor-pointer"
              >
                Контакти
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white">
              Контакти
            </h4>
            <div className="space-y-3">
              <a href="tel:+359878710501" className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <span>087 871 05 01</span>
              </a>
              <a href="tel:+359883920422" className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <span>088 392 04 22</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>
                  {"гр. София, кв. Овча купел, ул. \"Любляна\" № 34Б"}
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white">
              Информация
            </h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>Дарители и доброволци</p>
              <p>Свободни работни места</p>
              <p>Блог</p>
            </div>
          </div>
        </div>

        {/* Facebook Banner */}
        <div className="mt-10">
          <a
            href="https://www.facebook.com/groups/445912405601083/about"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/30 rounded-xl px-5 py-3.5 transition-colors duration-300 w-fit"
          >
            <Facebook className="h-6 w-6 text-[#1877F2] shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">
                Последвайте ни във Facebook
              </p>
              <p className="text-xs text-white/60">
                Новини, снимки и актуална информация
              </p>
            </div>
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            {currentYear}{" "}
            {"Хоспис \"Маринела\" 2008 ООД. Всички права запазени."}
          </p>
          <p className="text-sm text-white/60 flex items-center gap-1">
            {"Направено с"}{" "}
            <Heart className="h-3 w-3 text-red-400" />{" "}
            {"за нашите пациенти"}
          </p>
        </div>
      </div>
    </footer>
  );
}
