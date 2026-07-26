import { Navigation } from "@/components/navigation/Navigation";
import { VideoIntro } from "@/components/hero/VideoIntro";
import { AboutSection } from "@/components/sections/AboutSection";
import { StackSection } from "@/components/sections/StackSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { CurrentFocusSection } from "@/components/sections/CurrentFocusSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DevMotionToggle } from "@/components/ui/DevMotionToggle";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <VideoIntro />
        <AboutSection />
        <StackSection />
        <ExperienceSection />
        <ProjectsSection />
        <ArchitectureSection />
        <CurrentFocusSection />
        <ContactSection />
      </main>
      {process.env.NODE_ENV !== "production" && <DevMotionToggle />}
    </>
  );
}
