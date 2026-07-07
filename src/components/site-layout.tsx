import { Outlet } from "react-router-dom";
import Navbar from "@/pages/home/_components/Navbar.tsx";
import Footer from "@/pages/home/_components/Footer.tsx";
import Chatbot from "@/components/chatbot.tsx";

export default function SiteLayout() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Fixed green gradient background with CSS fallback */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.45 0.15 150), oklch(0.55 0.17 150), oklch(0.48 0.14 155))",
          backgroundImage:
            "url('/assets/file_uOIGeWFxMLGIjEndEi7clGVj.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Light overlay — minimal so the vivid green shines through */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-white/25" />

      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
