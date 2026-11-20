'use client'

import { Navbar } from '../components/navbar'
import { CardSpotlight } from '../components/card-spotlight'
import { Hero } from '../components/hero'
import {
  AboutSection,
  ExperienceSection,
} from '../components/sections/about-experience'
import { ProjectsSection } from '../components/sections/projects'
import {
  TechSection,
  EducationSection,
  SkillsSection,
} from '../components/sections/tech-education-skills'
import { ContactSection, Footer } from '../components/sections/contact'

export default function Page() {
  return (
    <>
      <CardSpotlight />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <TechSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
