import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import { siteData } from '@/data/content'

export default function HomePage() {
  return (
    <main>
      <HeroSection {...siteData.hero} />
      
      <AboutSection {...siteData.about} />

      <SkillsSection 
        {...siteData.skillsSection} 
        skillGroups={siteData.skillGroups} 
      />

      <ProjectsSection 
        {...siteData.projectsSection} 
        projects={siteData.projects.filter(p => p.featured)} 
      />

      <ContactSection {...siteData.contactSection} />
    </main>
  )
}

