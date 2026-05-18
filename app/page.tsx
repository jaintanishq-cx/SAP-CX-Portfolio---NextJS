import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import { reader } from '@/lib/keystatic'

export default async function HomePage() {
  const [hero, about, skillsSection, projectsSection, contactSection] =
    await Promise.all([
      reader.singletons.hero.read(),
      reader.singletons.about.read(),
      reader.singletons.skillsSection.read(),
      reader.singletons.projectsSection.read(),
      reader.singletons.contactSection.read(),
    ])

  const skillGroupsData = await reader.collections.skillGroups.all()
  const allProjectsData = await reader.collections.projects.all()

  if (!hero || !about || !skillsSection || !projectsSection || !contactSection) {
    return null
  }

  const skillGroups = skillGroupsData
    .map(g => ({ slug: g.slug, ...g.entry, skills: g.entry.skills.map(s => s.name) }))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  const featuredProjects = allProjectsData
    .filter(p => p.entry.featured)
    .sort((a, b) => (a.entry.order ?? 99) - (b.entry.order ?? 99))
    .map(p => ({
      slug: p.slug,
      ...p.entry,
      stack: p.entry.techStack.map(t => t.name),
      image: p.entry.coverImage ?? 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    }))

  return (
    <main>
      <HeroSection
        greeting={hero.greeting}
        name={hero.name}
        title={hero.title}
        tagline={hero.tagline}
        ctaPrimary={{ label: hero.ctaPrimaryLabel, href: hero.ctaPrimaryHref }}
        ctaSecondary={{ label: hero.ctaSecondaryLabel, href: hero.ctaSecondaryHref }}
      />
      
      <AboutSection
        sectionLabel={about.sectionLabel}
        heading={about.heading}
        bio={about.bio}
        stats={about.stats}
      />

      <SkillsSection
        sectionLabel={skillsSection.sectionLabel}
        heading={skillsSection.heading}
        subheading={skillsSection.subheading}
        skillGroups={skillGroups}
      />

      <ProjectsSection
        sectionLabel={projectsSection.sectionLabel}
        heading={projectsSection.heading}
        projects={featuredProjects}
      />

      <ContactSection {...contactSection} />
    </main>
  )
}

