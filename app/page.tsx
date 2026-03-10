import HeroSceneWrapper from "@/components/hero-scene-wrapper"
import HeroContent from "@/components/hero-content"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
//import ProjectsSection from "@/components/projects-section"
import CertificatesSection from "@/components/certificates-section"
import ContactSection, { Footer } from "@/components/contact-section"
import Navigation from "@/components/navigation"

export default function Page() {
  return (
    <>
      <HeroSceneWrapper />
      <Navigation />
      <main>
        <HeroContent />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        {/*<ProjectsSection />*/}
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

