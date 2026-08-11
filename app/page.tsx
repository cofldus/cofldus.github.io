import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactSection from "@/components/ImpactSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectSection from "@/components/ProjectSection";
import EducationSection from "@/components/EducationSection";
import PhilosophySection from "@/components/PhilosophySection";
import { CompanyProvider } from "@/context/CompanyContext";

export default function Home() {
  return (
    <CompanyProvider>
      <Navbar />
      <main style={{ paddingTop: 52 }}>
        <Hero />
        <ImpactSection />
        <ProjectSection />
        <SkillsSection />
        <EducationSection />
        <PhilosophySection />
      </main>
    </CompanyProvider>
  );
}
