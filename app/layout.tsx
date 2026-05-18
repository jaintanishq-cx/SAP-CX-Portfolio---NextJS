import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { reader } from '@/lib/keystatic'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await reader.singletons.siteSettings.read()
  if (!siteSettings) return {}

  return {
    title: siteSettings.siteTitle,
    description: siteSettings.siteDescription,
    openGraph: {
      title: siteSettings.siteTitle,
      description: siteSettings.siteDescription,
      type: 'website',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [navbar, siteSettings, contactSection] = await Promise.all([
    reader.singletons.navbar.read().then(res => res ?? {
      brand: 'Tanishq Jain',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/#about' },
        { label: 'Skills', href: '/#expertise' },
        { label: 'Projects', href: '/#projects' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/#contact' },
      ],
    }),
    reader.singletons.siteSettings.read().then(res => res ?? {
      siteTitle: 'Tanishq Jain — Portfolio',
      siteDescription: 'Senior SAP CX Developer & CIAM Architect',
      footerText: '© 2024 Tanishq Jain. All rights reserved.',
    }),
    reader.singletons.contactSection.read().then(res => res ?? {
      linkedinUrl: '#',
    }),
  ])

  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${inter.className} bg-background antialiased`}>
        <Navbar brand={navbar.brand} links={navbar.links} />
        <main>{children}</main>
        <Footer 
          footerText={siteSettings.footerText} 
          linkedinUrl={contactSection.linkedinUrl || '#'} 
        />
        <ScrollToTop />
      </body>
    </html>
  )
}

