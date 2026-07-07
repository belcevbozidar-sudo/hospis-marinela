import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import ScrollToTop from "./components/scroll-to-top.tsx";
import SiteLayout from "./components/site-layout.tsx";
import Index from "./pages/Index.tsx";
import AboutPage from "./pages/about/page.tsx";
import ServicesPage from "./pages/services/page.tsx";
import TeamPage from "./pages/team/page.tsx";
import ContactPage from "./pages/contact/page.tsx";
import ReviewsPage from "./pages/reviews/page.tsx";
import AdmissionPage from "./pages/admission/page.tsx";
import PricesPage from "./pages/prices/page.tsx";
import GalleryPage from "./pages/gallery/page.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
