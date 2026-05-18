import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { siteData } from '@/data/content'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteData.siteSettings.siteTitle,
  description: siteData.siteSettings.siteDescription,
  openGraph: {
    title: siteData.siteSettings.siteTitle,
    description: siteData.siteSettings.siteDescription,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${inter.className} bg-background antialiased`}>
        <Navbar brand={siteData.navbar.brand} links={siteData.navbar.links} />
        <main>{children}</main>
        <Footer 
          footerText={siteData.siteSettings.footerText} 
          linkedinUrl={siteData.contactSection.linkedinUrl} 
        />
        <ScrollToTop />
      </body>
    </html>
  )
}

