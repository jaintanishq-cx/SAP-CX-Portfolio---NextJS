import { config, fields, collection, singleton } from '@keystatic/core'

const isDev = process.env.NODE_ENV === 'development'
const hasGitHubSecrets = !!(
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  process.env.KEYSTATIC_SECRET
)

export default config({
  storage: (isDev || !hasGitHubSecrets)
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER || 'YOUR_GITHUB_USERNAME',
          name: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO || 'YOUR_REPO_NAME',
        },
      },

  ui: {
    brand: { name: 'Tanishq Jain — Portfolio CMS' },
    navigation: {
      Pages: ['hero', 'about', 'skillsSection', 'projectsSection', 'contactSection', 'blogSefction'],
      Content: ['skillGroups', 'projects', 'blogPosts'],
      Settings: ['siteSettings', 'navbar'],
    },
  },

  // ─── SINGLETONS ───────────────────────────────────────────────

  singletons: {

    hero: singleton({
      label: 'Hero Section',
      path: 'content/singletons/hero',
      schema: {
        greeting: fields.text({ label: 'Greeting', defaultValue: "Hi, I'm" }),
        name: fields.text({ label: 'Full Name', defaultValue: 'Tanishq Jain' }),
        title: fields.text({ label: 'Job Title', defaultValue: 'Senior SAP CX Developer & CIAM Architect' }),
        tagline: fields.text({ label: 'Tagline', multiline: true }),
        ctaPrimaryLabel: fields.text({ label: 'Primary CTA Label', defaultValue: 'View Projects' }),
        ctaPrimaryHref: fields.text({ label: 'Primary CTA Link', defaultValue: '#projects' }),
        ctaSecondaryLabel: fields.text({ label: 'Secondary CTA Label', defaultValue: 'Contact Me' }),
        ctaSecondaryHref: fields.text({ label: 'Secondary CTA Link', defaultValue: '#contact' }),
      },
    }),

    about: singleton({
      label: 'About Section',
      path: 'content/singletons/about',
      schema: {
        sectionLabel: fields.text({ label: 'Section Label', defaultValue: 'ABOUT ME' }),
        heading: fields.text({ label: 'Heading', defaultValue: 'Who I Am' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Value', defaultValue: '7+' }),
            label: fields.text({ label: 'Label', defaultValue: 'Years Experience' }),
          }),
          {
            label: 'Stats',
            itemLabel: props => props.fields.label.value,
          }
        ),
      },
    }),

    skillsSection: singleton({
      label: 'Skills Section Header',
      path: 'content/singletons/skills-section',
      schema: {
        sectionLabel: fields.text({ label: 'Section Label', defaultValue: 'EXPERTISE' }),
        heading: fields.text({ label: 'Heading', defaultValue: 'Skills & Proficiency' }),
        subheading: fields.text({ label: 'Subheading', multiline: true }),
      },
    }),

    projectsSection: singleton({
      label: 'Projects Section Header',
      path: 'content/singletons/projects-section',
      schema: {
        sectionLabel: fields.text({ label: 'Section Label', defaultValue: 'PORTFOLIO' }),
        heading: fields.text({ label: 'Heading', defaultValue: 'Enterprise Case Studies' }),
        subheading: fields.text({ label: 'Subheading', multiline: true }),
      },
    }),

    contactSection: singleton({
      label: 'Contact Section',
      path: 'content/singletons/contact',
      schema: {
        sectionLabel: fields.text({ label: 'Section Label', defaultValue: 'CONTACT' }),
        heading: fields.text({ label: 'Heading', defaultValue: "Let's Work Together" }),
        subheading: fields.text({ label: 'Subheading', multiline: true }),
        availabilityBadge: fields.text({ label: 'Availability Badge Text' }),
        availableForWork: fields.checkbox({ label: 'Available for Work?', defaultValue: true }),
        linkedinLabel: fields.text({ label: 'LinkedIn Button Label', defaultValue: 'Connect on LinkedIn' }),
        linkedinUrl: fields.url({ label: 'LinkedIn URL' }),
        formNameLabel: fields.text({ label: 'Form: Name Field Label', defaultValue: 'Full Name' }),
        formEmailLabel: fields.text({ label: 'Form: Email Field Label', defaultValue: 'Email Address' }),
        formMessageLabel: fields.text({ label: 'Form: Message Field Label', defaultValue: 'Message' }),
        formSubmitLabel: fields.text({ label: 'Form: Submit Button Label', defaultValue: 'Send Message' }),
        formSuccessMessage: fields.text({ label: 'Form: Success Message' }),
      },
    }),

    blogSection: singleton({
      label: 'Blog Section Header',
      path: 'content/singletons/blog-section',
      schema: {
        sectionLabel: fields.text({ label: 'Section Label', defaultValue: 'BLOG' }),
        heading: fields.text({ label: 'Heading', defaultValue: 'Thoughts & Insights' }),
        subheading: fields.text({ label: 'Subheading', multiline: true }),
        viewAllLabel: fields.text({ label: 'View All Label', defaultValue: 'View All Posts' }),
      },
    }),

    siteSettings: singleton({
      label: 'Site Settings',
      path: 'content/singletons/site-settings',
      schema: {
        siteTitle: fields.text({ label: 'Site Title' }),
        siteDescription: fields.text({ label: 'Meta Description', multiline: true }),
        siteUrl: fields.url({ label: 'Site URL' }),
        ownerName: fields.text({ label: 'Owner Name' }),
        footerText: fields.text({ label: 'Footer Text' }),
      },
    }),

    navbar: singleton({
      label: 'Navbar',
      path: 'content/singletons/navbar',
      schema: {
        brand: fields.text({ label: 'Brand Name', defaultValue: 'Tanishq Jain' }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Link href' }),
            openInNewTab: fields.checkbox({ label: 'Open in new tab?', defaultValue: false }),
          }),
          {
            label: 'Nav Links',
            itemLabel: props => props.fields.label.value,
          }
        ),
      },
    }),

  },

  // ─── COLLECTIONS ──────────────────────────────────────────────

  collections: {

    skillGroups: collection({
      label: 'Skill Groups',
      slugField: 'title',
      path: 'content/skill-groups/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        icon: fields.select({
          label: 'Icon',
          description: 'Lucide React icon name',
          options: [
            { label: 'ShieldCheck (SAP CDC)', value: 'ShieldCheck' },
            { label: 'Database (SAP CDP)', value: 'Database' },
            { label: 'Megaphone (Emarsys)', value: 'Megaphone' },
            { label: 'Cloud (Azure)', value: 'Cloud' },
            { label: 'Code2 (Web Dev)', value: 'Code2' },
            { label: 'Plug (Integrations)', value: 'Plug' },
            { label: 'Layers', value: 'Layers' },
            { label: 'Settings', value: 'Settings' },
          ],
          defaultValue: 'ShieldCheck',
        }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
        skills: fields.array(
          fields.object({
            name: fields.text({ label: 'Skill Name' }),
          }),
          {
            label: 'Skills',
            itemLabel: props => props.fields.name.value,
          }
        ),
      },
    }),

    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { contentField: 'businessProblem' },
      schema: {
        title: fields.slug({ name: { label: 'Client Name' } }),
        industry: fields.text({ label: 'Industry' }),
        role: fields.text({ label: 'Your Role' }),
        duration: fields.text({ label: 'Duration', description: 'e.g. 2 Years' }),
        teamSize: fields.text({ label: 'Team Size', description: 'e.g. 8 Members or Solo' }),
        description: fields.text({ label: 'Short Description (shown on card)', multiline: true }),
        businessProblem: fields.markdoc({ label: 'Business Problem' }),
        solutionDelivered: fields.markdoc({ label: 'Solution Delivered' }),
        techStack: fields.array(
          fields.object({
            name: fields.text({ label: 'Technology' }),
          }),
          {
            label: 'Tech Stack',
            itemLabel: props => props.fields.name.value,
          }
        ),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
          description: 'Upload a project cover image',
        }),
        coverImageAlt: fields.text({ label: 'Image Alt Text' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
        featured: fields.checkbox({ label: 'Show on Homepage?', defaultValue: true }),
      },
    }),

    blogPosts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedDate: fields.date({ label: 'Published Date' }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          description: 'Used as meta description (keep under 160 chars)',
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        coverImageAlt: fields.text({ label: 'Cover Image Alt Text' }),
        tags: fields.array(
          fields.object({
            name: fields.text({ label: 'Tag' }),
          }),
          {
            label: 'Tags',
            itemLabel: props => props.fields.name.value,
          }
        ),
        featured: fields.checkbox({ label: 'Featured Post?', defaultValue: false }),
        seoTitle: fields.text({ label: 'SEO Title (optional override)', validation: { isRequired: false } }),
        seoDescription: fields.text({
          label: 'SEO Description (optional override)',
          multiline: true,
          validation: { isRequired: false },
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

  },
})
