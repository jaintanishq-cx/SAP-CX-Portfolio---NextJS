'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Users, Briefcase, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Project {
  readonly slug: string
  readonly title: string
  readonly industry: string
  readonly role: string
  readonly duration: string
  readonly teamSize: string
  readonly image: string
  readonly description: string
  readonly stack: readonly string[]
  readonly order?: number | null
}

interface ProjectsSectionProps {
  readonly sectionLabel: string
  readonly heading: string
  readonly projects: readonly Project[]
}

export default function ProjectsSection({
  sectionLabel,
  heading,
  projects,
}: ProjectsSectionProps) {
  // Pass projects already sorted and filtered from parent or handle it here
  const sortedProjects = projects

  return (
    <section className="py-32 px-6 bg-[#FAFAFA]" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4"
          >
            {sectionLabel}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-dark"
          >
            {heading}
          </motion.h2>
        </div>

        {/* Project List */}
        <div className="space-y-32">
          {sortedProjects.map((project, index) => {
            const isEven = index % 2 !== 0
            const maxStack = 6
            const remainingStack = project.stack.length - maxStack

            return (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={cn(
                    "grid lg:grid-cols-2 gap-16 items-center p-8 rounded-[3.5rem] transition-all duration-500",
                    "hover:bg-white hover:shadow-2xl hover:shadow-primary/5"
                  )}
                >
                  {/* Image Column */}
                  <div className={cn(
                    "relative aspect-video lg:aspect-auto lg:h-[500px] overflow-hidden rounded-[2.5rem] shadow-xl group",
                    isEven ? "lg:order-2" : "lg:order-1"
                  )}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors duration-500" />
                    
                    {/* Hover Reveal Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/20 backdrop-blur-sm">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <ArrowRight className="text-primary w-8 h-8" />
                      </div>
                    </div>

                    {/* Industry Tag */}
                    <span className="absolute bottom-6 left-6 px-5 py-2 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-dark shadow-lg">
                      {project.industry}
                    </span>
                  </div>

                  {/* Content Column */}
                  <div className={cn(
                    "flex flex-col",
                    isEven ? "lg:order-1" : "lg:order-2"
                  )}>
                    {/* Meta Row */}
                    <div className="flex gap-4 mb-8">
                      <span className="flex items-center gap-2 text-muted font-bold text-[10px] uppercase tracking-widest bg-dark/5 px-3 py-1 rounded-full">
                        <Clock className="text-primary w-3 h-3" />
                        {project.duration}
                      </span>
                      <span className="flex items-center gap-2 text-muted font-bold text-[10px] uppercase tracking-widest bg-dark/5 px-3 py-1 rounded-full">
                        <Users className="text-primary w-3 h-3" />
                        {project.teamSize}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-dark group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Role */}
                    <div className="flex items-center gap-2 text-primary font-bold text-lg mb-8">
                      <Briefcase className="w-5 h-5" />
                      {project.role}
                    </div>

                    {/* Description */}
                    <p className="text-lg text-muted mb-10 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/40 mb-3">Core Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, maxStack).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-white border border-dark/5 rounded-xl text-[10px] font-bold text-dark/70 shadow-sm transition-colors group-hover:border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {remainingStack > 0 && (
                          <span className="px-4 py-2 bg-primary/10 rounded-xl text-[10px] font-bold text-primary shadow-sm">
                            +{remainingStack} MORE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
