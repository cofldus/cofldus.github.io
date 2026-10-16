import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import ExperienceSection from "@/components/ExperienceSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import MoreProjects from "@/components/MoreProjects";
import BackgroundSection from "@/components/BackgroundSection";
import ContactSection from "@/components/ContactSection";
import { CompanyProvider } from "@/context/CompanyContext";

export default function Home() {
  return (
    <CompanyProvider>
      <Navbar />
      <main id="main">
        <Hero />
        <SelectedWork />
        <ExperienceSection />
        <CapabilitiesSection />
        <MoreProjects />
        <BackgroundSection />
        <ContactSection />
      </main>
    </CompanyProvider>
  );
}
