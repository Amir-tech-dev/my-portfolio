import dynamic from "next/dynamic"
import HeroSceneWrapper from "@/components/hero-scene-wrapper"
import HeroContent from "@/components/hero-content"
import Navigation from "@/components/navigation"

const AboutSection = dynamic(() => import("@/components/about-section"))
const SkillsSection = dynamic(() => import("@/components/skills-section"))
const ExperienceSection = dynamic(() => import("@/components/experience-section"))
const CertificatesSection = dynamic(() => import("@/components/certificates-section"))
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.default })))
const Footer = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.Footer })))

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

