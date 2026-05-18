import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  ArrowLeft, 
  Briefcase, 
  Clock, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Layers 
} from 'lucide-react'
import { siteData } from '@/data/content'

interface ProjectPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return siteData.projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = siteData.projects.find((p) => p.slug === params.slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.title} | ${project.role}`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = siteData.projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary transition-colors mt-8 leading-none"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="mt-8 relative w-full h-[60vh] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-6 w-full pb-12">
            <span className="inline-block px-5 py-2 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-dark shadow-lg mb-6">
              {project.industry}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <Briefcase className="w-6 h-6" />
              {project.role}
            </div>
          </div>
        </div>
      </div>

      {/* Meta Row */}
      <div className="max-w-3xl mx-auto px-6 py-8 flex gap-6 flex-wrap border-b border-dark/10">
        <div className="flex items-center gap-2 text-muted font-bold text-xs uppercase tracking-widest bg-dark/5 px-4 py-2 rounded-full">
          <Clock className="text-primary w-4 h-4" />
          {project.duration}
        </div>
        <div className="flex items-center gap-2 text-muted font-bold text-xs uppercase tracking-widest bg-dark/5 px-4 py-2 rounded-full">
          <Users className="text-primary w-4 h-4" />
          {project.teamSize}
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-3xl mx-auto px-6">
        {/* Business Problem */}
        <section className="pt-16 pb-8">
          <div className="flex items-center gap-3 mb-6 font-black text-2xl text-dark">
            <AlertCircle className="text-primary w-6 h-6" />
            <h2>Business Problem</h2>
          </div>
          <p className="text-lg text-muted leading-relaxed">
            {project.businessProblem}
          </p>
        </section>

        {/* Solution Delivered */}
        <section className="pt-16 pb-8 border-t border-dark/10">
          <div className="flex items-center gap-3 mb-6 font-black text-2xl text-dark">
            <CheckCircle2 className="text-primary w-6 h-6" />
            <h2>Solution Delivered</h2>
          </div>
          <p className="text-lg text-muted leading-relaxed">
            {project.solutionDelivered}
          </p>
        </section>

        {/* Core Stack */}
        <section className="pt-16 pb-24 border-t border-dark/10">
          <div className="flex items-center gap-3 mb-6 font-black text-2xl text-dark">
            <Layers className="text-primary w-6 h-6" />
            <h2>Core Stack</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white border border-dark/5 rounded-xl text-[11px] font-bold text-dark/70 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

