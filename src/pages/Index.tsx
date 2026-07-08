import HeroSection from "./home/_components/HeroSection.tsx";
import TrustSection from "./home/_components/TrustSection.tsx";
import AboutSection from "./home/_components/AboutSection.tsx";
import ServicesSection from "./home/_components/ServicesSection.tsx";
import ConditionsSection from "./home/_components/ConditionsSection.tsx";
import TeamSection from "./home/_components/TeamSection.tsx";
import ContactSection from "./home/_components/ContactSection.tsx";
import { buildMeta } from "@/lib/seo.ts";
import {
  organizationSchema,
  webSiteSchema,
} from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";

export const meta = () => buildMeta("/");

export default function Index() {
  return (
    <>
      <JsonLd data={[organizationSchema(), webSiteSchema()]} />
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
