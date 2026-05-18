'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  Database, 
  Megaphone, 
  Cloud, 
  Code2, 
  Plug,
  LucideIcon 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = { 
  ShieldCheck, 
  Database, 
  Megaphone, 
  Cloud, 
  Code2, 
  Plug 
}

interface SkillGroup {
  slug: string
  title: string
  icon: string
  skills: string[]
}

interface SkillsSectionProps {
  sectionLabel: string
  heading: string
  subheading: string
  skillGroups: SkillGroup[]
}

export default function SkillsSection({
  sectionLabel,
  heading,
  subheading,
  skillGroups,
}: SkillsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    }
  }

  return (
    <section className="py-32 px-6 bg-white" id="skills">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4"
            id="skills-section-label"
          >
            {sectionLabel}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-dark mb-4"
            id="skills-heading"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted max-w-2xl"
            id="skills-subheading"
          >
            {subheading}
          </motion.p>
        </div>

        {/* Skill Groups Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="skills-grid"
        >
          {skillGroups.map((group) => {
            const IconComponent = iconMap[group.icon]
            return (
              <motion.div
                key={group.slug}
                variants={cardVariants}
                className={cn(
                  "p-8 rounded-[2rem] bg-background border border-dark/5",
                  "transition-all duration-300 cursor-default group",
                  "hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:border-primary/10",
                  "relative overflow-hidden"
                )}
                id={`skill-card-${group.slug}`}
              >
                {/* Top indicator bar on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Icon Row */}
                <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-6 w-fit" id={`skill-icon-${group.slug}`}>
                  {IconComponent && <IconComponent size={24} />}
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-dark mb-4" id={`skill-title-${group.slug}`}>
                  {group.title}
                </h3>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-2" id={`skill-list-${group.slug}`}>
                  {group.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-dark/5 rounded-lg text-[11px] font-bold text-dark/70 tracking-wide uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
