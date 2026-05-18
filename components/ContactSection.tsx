'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactSectionProps {
  sectionLabel: string
  heading: string
  subheading: string
  availabilityBadge: string
  availableForWork: boolean
  linkedinLabel: string
  linkedinUrl: string
  formNameLabel: string
  formEmailLabel: string
  formMessageLabel: string
  formSubmitLabel: string
  formSuccessMessage: string
}

export default function ContactSection({
  sectionLabel,
  heading,
  subheading,
  availabilityBadge,
  availableForWork,
  linkedinLabel,
  linkedinUrl,
  formNameLabel,
  formEmailLabel,
  formMessageLabel,
  formSubmitLabel,
  formSuccessMessage,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || 'Failed to send message. Please try again.')
        setStatus('error')
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again later.')
      setStatus('error')
    }
  }

  return (
    <section className="py-32 px-6 bg-[#FAFAFA]" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4" id="contact-section-label">
              {sectionLabel}
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-dark mb-6" id="contact-heading">
              {heading}
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-10 max-w-lg" id="contact-subheading">
              {subheading}
            </p>

            {/* Availability Badge */}
            {availableForWork && (
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-bold border border-green-200 mb-10"
                id="contact-availability-badge"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {availabilityBadge}
              </div>
            )}

            {/* LinkedIn Button */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-dark text-white font-bold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
              id="contact-linkedin-button"
            >
              <Linkedin size={20} />
              {linkedinLabel}
            </a>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            id="contact-form-container"
          >
            <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-dark/5 border border-dark/5 min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                    id="contact-success-state"
                  >
                    <div className="flex justify-center mb-6">
                      <CheckCircle2 size={64} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-black text-dark mb-4">Message Sent!</h3>
                    <p className="text-muted leading-relaxed max-w-xs mx-auto">
                      {formSuccessMessage}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-primary font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    id="contact-form"
                  >
                    {/* Name */}
                    <div id="form-field-name">
                      <label htmlFor="name" className="block text-sm font-bold text-dark mb-2">
                        {formNameLabel}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-5 py-4 rounded-2xl border border-dark/10 bg-background text-dark placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div id="form-field-email">
                      <label htmlFor="email" className="block text-sm font-bold text-dark mb-2">
                        {formEmailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 rounded-2xl border border-dark/10 bg-background text-dark placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div id="form-field-message">
                      <label htmlFor="message" className="block text-sm font-bold text-dark mb-2">
                        {formMessageLabel}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        className="w-full px-5 py-4 rounded-2xl border border-dark/10 bg-background text-dark placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    {/* Error Message */}
                    {status === 'error' && (
                      <p className="text-red-500 text-sm font-bold" id="contact-error-message">
                        {errorMessage}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={cn(
                        "w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg",
                        "hover:brightness-110 transition-all duration-300 shadow-xl shadow-primary/20",
                        "flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      )}
                      id="contact-submit-button"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          <Send size={20} />
                          {formSubmitLabel}
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
