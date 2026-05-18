'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

interface HeroSectionProps {
  greeting: string
  name: string
  title: string
  tagline: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

export default function HeroSection({
  greeting,
  name,
  title,
  tagline,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  // Split name to color the last part differently
  const nameParts = name.split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6 pt-20" id="hero">
      <motion.div
        className="max-w-4xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting & Title */}
        <motion.p
          variants={itemVariants}
          className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-6"
          id="hero-greeting"
        >
          {greeting} {title}
        </motion.p>

        {/* Name Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]"
          id="hero-name"
        >
          <span className="text-dark">{firstName}</span>{' '}
          <span className="text-primary">{lastName}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-medium text-dark/80 mb-10 max-w-3xl mx-auto leading-relaxed"
          id="hero-tagline"
        >
          {tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6"
          id="hero-ctas"
        >
          <Link
            href={ctaPrimary.href}
            className="group flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:brightness-110 transition-all duration-300 shadow-2xl shadow-primary/20"
            id="hero-cta-primary"
          >
            {ctaPrimary.label}
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
          </Link>

          <Link
            href={ctaSecondary.href}
            className="flex items-center gap-2 bg-white border-2 border-dark/5 px-10 py-5 rounded-2xl font-bold text-dark hover:bg-dark hover:text-white transition-all duration-300 shadow-sm"
            id="hero-cta-secondary"
          >
            <Mail size={20} />
            {ctaSecondary.label}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
