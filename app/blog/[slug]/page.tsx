import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteData } from '@/data/content'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return siteData.blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = siteData.blogPosts.find((p) => p.slug === params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | Tanishq Jain Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = siteData.blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const readTime = Math.ceil(post.content.split(' ').length / 200)

  return (
    <div className="bg-background min-h-screen">
      {/* Back Button Container */}
      <div className="max-w-7xl mx-auto px-6 pt-32 mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary transition-colors group"
          id="back-to-blog-link"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-dark/20" />
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta Header */}
        <div className="mb-12">
          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-6">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-dark mb-8 leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted font-bold">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              {new Date(post.publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              {readTime} min read
            </div>
          </div>
        </div>

        <div className="h-px bg-dark/5 mb-12" />

        {/* Article Body */}
        <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-dark/80 prose-p:leading-relaxed prose-strong:text-dark prose-a:text-primary">
          <div className="whitespace-pre-wrap text-lg text-dark/80 leading-relaxed font-medium">
            {post.content}
          </div>
        </div>
        
        {/* Footer Navigation */}
        <div className="mt-20 pt-10 border-t border-dark/5">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
          >
            Read more articles <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>
      </article>
    </div>
  )
}
