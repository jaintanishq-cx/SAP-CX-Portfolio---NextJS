import React from 'react'
import { Linkedin } from 'lucide-react'

interface FooterProps {
  footerText: string
  linkedinUrl: string
}

export default function Footer({ footerText, linkedinUrl }: FooterProps) {
  return (
    <footer className="py-8 border-t border-dark/5 bg-background" id="main-footer">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright / Text */}
        <p className="text-sm text-muted" id="footer-text">
          {footerText}
        </p>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary transition-colors p-2 hover:bg-dark/5 rounded-xl"
            aria-label="LinkedIn"
            id="linkedin-link"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
