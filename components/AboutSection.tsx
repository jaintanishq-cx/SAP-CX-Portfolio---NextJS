'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Stat {
  value: string
  label: string
}

interface AboutSectionProps {
  sectionLabel: string
  heading: string
  bio: string
  stats: Stat[]
}

export default function AboutSection({
  sectionLabel,
  heading,
  bio,
  stats,
}: AboutSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-32 px-6 bg-[#FAFAFA]" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left Column: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative aspect-square max-w-sm mx-auto rounded-[3rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-xl shadow-primary/5"
              id="about-visual-card"
            >
              <span className="text-[10rem] font-black text-primary/20 select-none">
                TJ
              </span>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <motion.p
              variants={itemVariants}
              className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4"
              id="about-label"
            >
              {sectionLabel}
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-dark mb-8"
              id="about-heading"
            >
              {heading}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted leading-relaxed mb-12"
              id="about-bio"
            >
              {bio}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 flex-wrap"
              id="about-stats"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-dark">{stat.value}</span>
                    <span className="text-sm text-muted uppercase tracking-widest mt-1">
                      {stat.label}
                    </span>
                  </div>
                  {index !== stats.length - 1 && (
                    <div className="hidden sm:block w-px h-12 bg-dark/10" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
