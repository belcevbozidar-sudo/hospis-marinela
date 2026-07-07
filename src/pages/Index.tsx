import HeroSection from "./home/_components/HeroSection.tsx";
import TrustSection from "./home/_components/TrustSection.tsx";
import AboutSection from "./home/_components/AboutSection.tsx";
import ServicesSection from "./home/_components/ServicesSection.tsx";
import ConditionsSection from "./home/_components/ConditionsSection.tsx";
import TeamSection from "./home/_components/TeamSection.tsx";
import ContactSection from "./home/_components/ContactSection.tsx";

export default function Index() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <ConditionsSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
