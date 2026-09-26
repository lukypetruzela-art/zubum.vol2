import { Hero } from "@/components/dasen/Hero";
import { About } from "@/components/dasen/About";
import { NewsSection } from "@/components/dasen/NewsSection";
import { HoursSection } from "@/components/dasen/HoursSection";
import { PricingSection } from "@/components/dasen/PricingSection";
import { EmergencySection } from "@/components/dasen/EmergencySection";
import { ContactSection } from "@/components/dasen/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <NewsSection />
      <HoursSection />
      <PricingSection />
      <EmergencySection />
      <ContactSection />
    </>
  );
}
