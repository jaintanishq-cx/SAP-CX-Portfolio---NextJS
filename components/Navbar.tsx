'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavLink {
  readonly label: string
  readonly href: string
}

interface NavbarProps {
  readonly brand: string
  readonly links: readonly NavLink[]
}

export default function Navbar({ brand, links }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-dark/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link 
          href="/" 
          className="text-lg font-semibold text-dark hover:text-primary transition-colors"
          id="nav-brand"
        >
          {brand}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  isActive 
                    ? "font-bold text-primary" 
                    : "font-medium text-muted hover:text-primary"
                )}
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-dark hover:bg-dark/5 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-b border-dark/5"
            id="mobile-dropdown"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-base transition-colors",
                      isActive 
                        ? "font-bold text-primary" 
                        : "font-medium text-muted hover:text-primary"
                    )}
                    id={`mobile-nav-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
