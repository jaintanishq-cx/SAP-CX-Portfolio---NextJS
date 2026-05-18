import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { reader } from '@/lib/keystatic'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const blogSection = await reader.singletons.blogSection.read()
  return {
    title: 'Blog | Tanishq Jain',
    description: blogSection?.subheading ?? '',
  }
}

export default async function BlogListingPage() {
  const [blogSection, allPostsData] = await Promise.all([
    reader.singletons.blogSection.read(),
    reader.collections.blogPosts.all(),
  ])

  if (!blogSection) return null

  const posts = allPostsData
    .map(p => ({ slug: p.slug, ...p.entry }))
    .sort((a, b) => {
      const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0
      const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0
      return dateB - dateA
    })

  return (
    <div className="pt-32 pb-16 px-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4">
            {blogSection.sectionLabel}
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter mb-6">
            {blogSection.heading}
          </h1>
          <p className="text-xl text-muted max-w-2xl leading-relaxed">
            {blogSection.subheading}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            // content is a function because of markdoc
            // but we don't need readTime for listing if it's too expensive, 
            // or we just estimate.
            
            return (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`} 
                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-dark/5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                id={`blog-card-${post.slug}`}
              >
                {/* Cover Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.coverImage ?? 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card Body */}
                <div className="p-8 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag.name}
                        className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-dark group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer Row */}
                  <div className="flex justify-between items-center text-xs text-muted font-bold pt-4 border-t border-dark/5">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }) : 'Draft'}
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
