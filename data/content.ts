export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SkillGroup {
  slug: string;
  title: string;
  icon: string;
  order: number;
  skills: string[];
}

export interface Project {
  slug: string;
  title: string;
  industry: string;
  role: string;
  duration: string;
  teamSize: string;
  image: string;
  description: string;
  stack: string[];
  order: number;
  featured: boolean;
  businessProblem: string;
  solutionDelivered: string;
}

export interface SiteData {
  hero: {
    greeting: string;
    name: string;
    title: string;
    tagline: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  about: {
    sectionLabel: string;
    heading: string;
    bio: string;
    stats: Stat[];
  };
  skillsSection: {
    sectionLabel: string;
    heading: string;
    subheading: string;
  };
  skillGroups: SkillGroup[];
  projectsSection: {
    sectionLabel: string;
    heading: string;
    subheading: string;
  };
  projects: Project[];
  contactSection: {
    sectionLabel: string;
    heading: string;
    subheading: string;
    availabilityBadge: string;
    availableForWork: boolean;
    linkedinLabel: string;
    linkedinUrl: string;
    formNameLabel: string;
    formEmailLabel: string;
    formMessageLabel: string;
    formSubmitLabel: string;
    formSuccessMessage: string;
  };
  siteSettings: {
    siteTitle: string;
    siteDescription: string;
    ownerName: string;
    footerText: string;
  };
  navbar: {
    brand: string;
    links: NavLink[];
  };
}

export const siteData: SiteData = {
  hero: {
    greeting: "Hi, I'm",
    name: "Tanishq Jain",
    title: "Senior SAP CX Developer & CIAM Architect",
    tagline: "7+ years building secure, scalable Customer Identity & Access Management platforms across global enterprise environments using SAP CDC, SAP CDP, and Azure.",
    ctaPrimary: { label: "View Projects", href: "#projects" },
    ctaSecondary: { label: "Contact Me", href: "#contact" },
  },

  about: {
    sectionLabel: "ABOUT ME",
    heading: "Who I Am",
    bio: "Senior SAP CX Developer with ~7 years of experience specialising in Customer Identity & Access Management (CIAM) across global, multi-brand enterprise environments. I work across the full spectrum — from architecture and discovery workshops to hands-on implementation of SAP CDC, SAP CDP, and Azure integrations. My work spans retail, healthcare, B2B manufacturing, home appliances, and grocery — helping enterprises unify customer identities, secure access, and activate data at scale.",
    stats: [
      { value: "7+", label: "Years Experience" },
      { value: "10+", label: "Enterprise Projects" },
      { value: "3", label: "SAP Certifications" },
    ],
  },

  skillsSection: {
    sectionLabel: "EXPERTISE",
    heading: "Skills & Proficiency",
    subheading: "Full-spectrum CIAM and CDP implementation across the SAP CX ecosystem.",
  },

  skillGroups: [
    {
      slug: "sap-cdc",
      title: "SAP CDC / Gigya",
      icon: "ShieldCheck",
      order: 1,
      skills: [
        "Site Setup", "Screen-sets", "SSO (SAML/OIDC)", "MFA",
        "Passkeys / FIDO", "RBA", "Webhooks", "Dataflows",
        "B2B Org Management", "Extensions", "Federation",
      ],
    },
    {
      slug: "sap-cdp",
      title: "SAP CDP",
      icon: "Database",
      order: 2,
      skills: [
        "Custom Connectors", "Unified Profiles", "Event Modelling",
        "Activity Indicators", "Segments", "CX Flows",
        "Matching & Merging", "Data Governance",
      ],
    },
    {
      slug: "sap-emarsys",
      title: "SAP Emarsys",
      icon: "Megaphone",
      order: 3,
      skills: [
        "CDP–Emarsys Activation", "Audiences",
        "Marketing Activities", "Journey Builder",
      ],
    },
    {
      slug: "azure",
      title: "Azure",
      icon: "Cloud",
      order: 4,
      skills: [
        "Azure AD B2C", "Azure Functions", "App Service",
        "Logic Apps", "AKS", "Service Bus",
        "Key Vault", "Event Grid", "Blob Storage",
      ],
    },
    {
      slug: "web-dev",
      title: "Web & Dev",
      icon: "Code2",
      order: 5,
      skills: [
        "JavaScript", "Node.js", "React", "Next.js",
        "Python (Flask)", "REST APIs", "HTML/CSS",
      ],
    },
    {
      slug: "integrations",
      title: "Integrations",
      icon: "Plug",
      order: 6,
      skills: [
        "SAP Commerce Cloud (CCv2)", "Spartacus", "Hybris",
        "SAP C4C", "Salesforce", "Iterable",
        "Optimizely", "Mobile (Android/iOS)",
      ],
    },
  ],

  projectsSection: {
    sectionLabel: "PORTFOLIO",
    heading: "Enterprise Case Studies",
    subheading: "End-to-end CIAM and CDP implementations across global enterprises.",
  },

  projects: [
    {
      slug: "electrolux",
      title: "Electrolux",
      industry: "Home Appliances",
      role: "Senior Developer – CIAM & CDP",
      duration: "2 Years",
      teamSize: "8 Members",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      description: "Global multi-brand CIAM & CDP implementation for identity, consent, integrations, and customer engagement. Configured CDC sites, policies, RBA, SSO, OIDC, MFA, screensets, webhooks, dataflows and migration. Implemented CDP connectors, events, segments and CX flows. Led integrations with CCv2, Optimizely, Azure Power Pages, C4C, Hybris, Iterable, Spartacus, Android & iOS.",
      stack: ["SAP CDC", "SAP CDP", "CCv2", "Hybris", "Optimizely", "Azure Power Pages", "C4C", "Iterable", "Spartacus", "OIDC", "SSO", "MFA"],
      order: 1,
      featured: true,
      businessProblem: "Electrolux operated multiple consumer brands across 50+ markets with fragmented identity systems — no unified login, inconsistent consent management, and no single customer view across web, mobile, and eCommerce platforms. The lack of a centralised CIAM layer meant customer data was siloed, compliance obligations were difficult to enforce, and personalisation at scale was impossible.",
      solutionDelivered: "Designed and implemented a global multi-brand CIAM platform using SAP CDC as the identity backbone. Configured site hierarchy, RBA policies, SSO via OIDC/SAML, MFA flows, and brand-specific screen-sets. Built SAP CDP integration for unified customer profiles, with CX flows feeding Iterable and C4C. Led technical integrations across CCv2, Hybris, Spartacus, Optimizely, Azure Power Pages, and native mobile apps on Android and iOS.",
    },
    {
      slug: "sobeys",
      title: "Sobeys",
      industry: "Retail / Grocery",
      role: "Senior Developer",
      duration: "2.5 Years",
      teamSize: "5 Members",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      description: "Integrated SAP CDC & CDP across 12 brand websites, eCommerce, 6 mobile apps, loyalty partner sites, Salesforce Sales & Marketing Cloud, and analytics ecosystem across 3 project phases.",
      stack: ["SAP CDC", "SAP CDP", "Salesforce Sales Cloud", "Salesforce Marketing Cloud", "eCommerce Platform", "Mobile Apps"],
      order: 2,
      featured: true,
      businessProblem: "Sobeys, one of Canada's largest grocery retailers, had 12 distinct brand websites, 6 mobile apps, and a loyalty ecosystem operating with separate identity stores. Customer data was duplicated across Salesforce, in-house analytics, and eCommerce platforms, making it impossible to build a unified loyalty and personalisation programme.",
      solutionDelivered: "Delivered a three-phase CDC and CDP rollout consolidating identity across all 12 brands and 6 mobile apps into a single SAP CDC tenant. Implemented loyalty partner integrations, Salesforce Sales and Marketing Cloud connectors, and a CDP-based unified customer view powering segmentation and targeted campaigns.",
    },
    {
      slug: "xymogen",
      title: "Xymogen",
      industry: "Healthcare",
      role: "Senior Developer / Architect",
      duration: "8 Months",
      teamSize: "3 Members",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      description: "Led architecture and implementation of SAP CDC-based CIAM solution with complex enterprise integrations and B2B access control. Conducted discovery workshops, translated business needs into technical user stories, and integrated with SAP S4, CCv2 and proprietary apps.",
      stack: ["SAP CDC", "SAP S4", "CCv2", "Spartacus", "OIDC", "SAML", "MFA", "FIDO", "RBA", "Dataflow", "Extensions", "Webhooks"],
      order: 3,
      featured: true,
      businessProblem: "Xymogen, a healthcare supplement manufacturer, needed a CIAM platform that could enforce B2B access control — restricting product access based on practitioner credentials — while integrating with SAP S4, SAP Commerce Cloud, and proprietary internal apps. Existing identity management was manual and error-prone with no self-service capability.",
      solutionDelivered: "Architected and delivered an SAP CDC-based CIAM solution with B2B organisation management, policy-based access control, and FIDO/passkey authentication. Configured Federation, OIDC, SAML, MFA, RBA, ETL pipelines via Dataflow, custom Extensions and Webhooks. Integrated with SAP S4, CCv2, Spartacus, and proprietary platforms.",
    },
    {
      slug: "workwear-group",
      title: "Workwear Group AU",
      industry: "B2B / Apparel",
      role: "Architect / Senior Developer",
      duration: "6 Months",
      teamSize: "Solo",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      description: "Implemented SAP CDC as a centralised B2B identity platform across 4 enterprise applications supporting ~500K wearers. Enabled SAML-based SSO, self-service registration, multi bill-to identity mapping, MFA and modern auth.",
      stack: ["SAP CDC", "SAML 2.0", "MFA", "Passkeys", "OTP", "B2B Identity Architecture"],
      order: 4,
      featured: true,
      businessProblem: "Workwear Group AU managed uniform and workwear ordering for ~500K wearers across 4 separate enterprise applications with no unified identity layer. Each application had its own login, creating friction for corporate buyers, compliance gaps, and no ability to enforce MFA or modern authentication standards across the estate.",
      solutionDelivered: "As sole architect and developer, designed and delivered a centralised B2B identity platform on SAP CDC. Implemented SAML 2.0 SSO across all 4 applications, multi bill-to identity mapping for complex corporate account structures, self-service registration flows, MFA enforcement, and passkey/OTP-ready modern authentication.",
    },
    {
      slug: "pfleiderer",
      title: "Pfleiderer",
      industry: "B2B / Manufacturing",
      role: "Senior Developer",
      duration: "5 Months",
      teamSize: "2 Members",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",
      description: "Implemented SAP CDC as a centralised B2B identity platform across enterprise applications, enabling secure access, federation, and scalable CIAM capabilities integrated with SAP S4 and Uniorg.",
      stack: ["SAP CDC", "SAP S4", "Uniorg", "SAML", "MFA", "Dataflow"],
      order: 5,
      featured: true,
      businessProblem: "Pfleiderer, a European wood-based materials manufacturer, operated enterprise applications with siloed authentication and no federated identity capability. Integration with SAP S4 and the Uniorg ERP system required a secure, scalable identity layer that didn't exist.",
      solutionDelivered: "Delivered SAP CDC as the centralised CIAM backbone, implementing SAML federation with SAP S4 and Uniorg, MFA enforcement, and Dataflow-based ETL pipelines for identity data synchronisation. Established a scalable B2B identity architecture aligned with Pfleiderer's security and compliance requirements.",
    },
  ],

  contactSection: {
    sectionLabel: "CONTACT",
    heading: "Let's Work Together",
    subheading: "Open to global contract engagements in SAP CX, CIAM & CDP.",
    availabilityBadge: "Available for new contracts",
    availableForWork: true,
    linkedinLabel: "Connect on LinkedIn",
    linkedinUrl: "https://linkedin.com/in/YOUR_HANDLE",
    formNameLabel: "Full Name",
    formEmailLabel: "Email Address",
    formMessageLabel: "Message",
    formSubmitLabel: "Send Message",
    formSuccessMessage: "Thanks! I'll get back to you within 24 hours.",
  },

  siteSettings: {
    siteTitle: "Tanishq Jain | SAP CX Developer & CIAM Architect",
    siteDescription: "Senior SAP CX Developer with 7+ years specialising in SAP CDC, SAP CDP and Azure CIAM solutions.",
    ownerName: "Tanishq Jain",
    footerText: "© 2025 Tanishq Jain · SAP CX Consultant",
  },

  navbar: {
    brand: "Tanishq Jain",
    links: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
}
