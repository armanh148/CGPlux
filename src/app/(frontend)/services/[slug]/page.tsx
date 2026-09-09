import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data";
import SingleServiceClient from "@/components/SingleServiceClient";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const service = getFallbackService(params.slug);
  return {
    title: service ? `${service.title} | CGPLUX Engineering` : "Service Details | CGPLUX",
    description: service?.tagline || service?.description || "High-performance technical services by CGPLUX Studios.",
  };
}

export interface ServiceDetailData {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tags: string[];
  specs: { label: string; value: string }[];
  deliverables: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  image?: string;
  type?: "laptop-angled" | "laptop-saas" | "phone" | "laptop-stone" | "laptop-hand";
}

const SERVICES_DATABASE: Record<string, ServiceDetailData> = {
  "website-development": {
    slug: "website-development",
    title: "Website & Full-Stack Web Development",
    category: "Web Architecture",
    tagline: "High-performance web apps, modern Next.js frontends & cloud-native backends.",
    description:
      "We engineer custom web applications built for speed, scalability, and security. Utilizing Next.js, React, and TypeScript, we build zero-latency web experiences optimized for high conversion rates and search engine dominance.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "Vercel"],
    specs: [
      { label: "Target Speed", value: "< 1.2s LCP" },
      { label: "Architecture", value: "Headless & Jamstack" },
      { label: "Security Standard", value: "SOC-2 / OWASP Top 10" },
      { label: "Deployment", value: "Vercel / AWS Cloud" },
    ],
    deliverables: [
      { title: "Custom Frontend Architecture", desc: "Next.js App Router setup with server components and atomic design tokens." },
      { title: "RESTful & GraphQL API Layer", desc: "Type-safe backend API integrations with real-time caching mechanisms." },
      { title: "Core Web Vitals Optimization", desc: "Strict performance tuning to achieve 95+ PageSpeed scores on mobile and desktop." },
      { title: "Headless CMS & Database Setup", desc: "Flexible content workflows powered by Sanity, Strapi, or PostgreSQL." },
      { title: "Automated CI/CD Pipelines", desc: "Zero-downtime deployment pipelines with automated linting and unit testing." },
    ],
    process: [
      { step: "01", title: "Technical Discovery & Scope", desc: "Requirements analysis, architecture design, and database schema mapping." },
      { step: "02", title: "API & Data Layer Setup", desc: "Configuring headless endpoints, auth providers, and database schemas." },
      { step: "03", title: "Component & UI Engineering", desc: "Building responsive, pixel-perfect frontend components with micro-animations." },
      { step: "04", title: "Performance & Security Audits", desc: "Core Web Vitals optimization, penetration checks, and accessibility testing." },
      { step: "05", title: "Production Launch & SLA", desc: "DNS cutover, global CDN caching, and 24/7 SLA infrastructure monitoring." },
    ],
    type: "laptop-angled",
  },
  "branding-design": {
    slug: "branding-design",
    title: "Branding & UI/UX Design Systems",
    category: "Creative & Visual Identity",
    tagline: "Strategic brand identities, scalable design systems, and conversion-focused UI/UX.",
    description:
      "Design is a strategic revenue driver. We design comprehensive visual identity systems, component libraries, and intuitive digital interfaces that convert visitors into loyal clients.",
    tags: ["Figma", "Design Systems", "UI/UX", "Brand Guidelines", "Visual Identity", "Interactive Prototypes"],
    specs: [
      { label: "Design Framework", value: "Atomic Design System" },
      { label: "Prototype Fidelity", value: "High-Fidelity Interactive" },
      { label: "Deliverables", value: "Figma Library & Tokens" },
      { label: "Accessibility", value: "WCAG 2.1 AA Compliant" },
    ],
    deliverables: [
      { title: "Visual Brand Identity", desc: "Complete visual strategy including logo design, color typography tokens, and usage guidelines." },
      { title: "Figma Component Library", desc: "Comprehensive component library with full auto-layout, dark mode tokens, and variants." },
      { title: "Interactive User Flows", desc: "Clickable high-fidelity prototypes demonstrating seamless user journeys and state transitions." },
      { title: "Responsive Layout Specifications", desc: "Tailored desktop, tablet, and mobile interface viewports designed for conversion." },
      { title: "Developer Handoff Package", desc: "Detailed design token documentation, asset exports, and CSS variable specs." },
    ],
    process: [
      { step: "01", title: "Brand Strategy & Audit", desc: "Analyzing market positioning, audience personas, and competitor visual systems." },
      { step: "02", title: "Wireframing & UX Architecture", desc: "Mapping user journeys, sitemaps, and low-fidelity structural layouts." },
      { step: "03", title: "Visual Identity Exploration", desc: "Developing typography, color palettes, micro-interactions, and visual direction." },
      { step: "04", title: "Design System & Components", desc: "Building reusable UI primitives, buttons, cards, inputs, and state specs." },
      { step: "05", title: "Handoff & QA Review", desc: "Conducting design review sessions and developer handoff walkthroughs." },
    ],
    type: "phone",
  },
  "crm-system": {
    slug: "crm-system",
    title: "CRM & Enterprise Operations Engines",
    category: "Enterprise Infrastructure",
    tagline: "Bespoke CRM engines, automated operational workflows, and executive analytics dashboards.",
    description:
      "Eliminate operational bottlenecks with custom-built enterprise CRM platforms. We build tailored dashboards, lead pipelines, automated customer communication workflows, and real-time data sync across your tech stack.",
    tags: ["Custom CRM", "Workflow Automation", "PostgreSQL", "Role-Based Access", "Analytics", "ERP Integration"],
    specs: [
      { label: "System Throughput", value: "100k+ Ops/Sec" },
      { label: "Encryption", value: "AES-256 at Rest" },
      { label: "Compliance", value: "GDPR / HIPAA Ready" },
      { label: "API Latency", value: "< 45ms Average" },
    ],
    deliverables: [
      { title: "Lead & Customer Pipeline Modules", desc: "Kanban boards, deal tracking, automated follow-ups, and customer profile management." },
      { title: "Role-Based Access Control (RBAC)", desc: "Granular permission layers for admins, managers, sales agents, and client portals." },
      { title: "Executive Telemetry Dashboard", desc: "Real-time revenue analytics, conversion rates, performance metrics, and PDF exports." },
      { title: "Third-Party Integrations", desc: "Seamless integrations with Stripe, HubSpot, Salesforce, WhatsApp, and Twilio APIs." },
      { title: "Automated Dispatch Engines", desc: "Event-driven webhooks, scheduled triggers, and automated notification channels." },
    ],
    process: [
      { step: "01", title: "Workflow Audit & Schema Design", desc: "Mapping business processes, data flows, and relational database schemas." },
      { step: "02", title: "Core Engine & Auth Engineering", desc: "Building JWT/OAuth authentication, database indexing, and backend services." },
      { step: "03", title: "Dashboard & Pipeline UI", desc: "Designing responsive, data-dense enterprise user interfaces and controls." },
      { step: "04", title: "Data Migration & Validation", desc: "Migrating legacy customer records with zero data loss and automated validation." },
      { step: "05", title: "Enterprise Deployment", desc: "Deploying on dedicated cloud servers with automated backup and 99.9% uptime SLA." },
    ],
    type: "laptop-saas",
  },
  "e-commerce": {
    slug: "e-commerce",
    title: "Headless E-Commerce Solutions",
    category: "High-Conversion Storefronts",
    tagline: "Headless digital storefronts engineered for maximum conversion rates and seamless checkout.",
    description:
      "We build ultra-fast e-commerce platforms that increase average order value (AOV) and reduce cart abandonment. By decoupling frontend presentation from backend commerce engines, we achieve instant page loads and total creative freedom.",
    tags: ["Headless Commerce", "Shopify Plus", "Next.js Storefront", "Stripe API", "Cart Optimization", "Tailwind"],
    specs: [
      { label: "Checkout Processing", value: "< 300ms Latency" },
      { label: "Speed Gain", value: "+300% vs Monolith" },
      { label: "Payment Routing", value: "Multi-Currency & Localized" },
      { label: "Inventory Sync", value: "Real-Time Webhooks" },
    ],
    deliverables: [
      { title: "Headless Next.js Storefront", desc: "Blazing fast React/Next.js product catalog with instant search and filtering." },
      { title: "Storefront API Integration", desc: "Seamless GraphQL integration with Shopify Plus, MedusaJS, or Commerce Layer." },
      { title: "One-Click Checkout Optimization", desc: "Streamlined multi-step checkout flow optimized to reduce cart drop-offs." },
      { title: "Customer Account Portal", desc: "Order history, recurring subscription management, and saved payment profiles." },
      { title: "Analytics & Pixel Setup", desc: "Full GA4, Meta Pixel, and conversion tracking event triggers." },
    ],
    process: [
      { step: "01", title: "Catalog & Checkout Discovery", desc: "Product taxonomy mapping, payment gateway selection, and UX audit." },
      { step: "02", title: "Headless Frontend Engineering", desc: "Building fast product grid pages, variant selectors, and slide-out carts." },
      { step: "03", title: "API & Payment Integration", desc: "Connecting payment gateways, tax calculation engines, and shipping APIs." },
      { step: "04", title: "Load & Stress Testing", desc: "Simulating high flash-sale traffic spikes and checkout stress tests." },
      { step: "05", title: "Global CDN Launch", desc: "Deploying edge-cached storefront on global Vercel/Cloudflare networks." },
    ],
    type: "laptop-angled",
  },
  "app-development": {
    slug: "app-development",
    title: "Mobile Application Development",
    category: "Native & Cross-Platform Mobile",
    tagline: "Native iOS & Android mobile apps featuring offline capabilities and fluid 60fps interactions.",
    description:
      "Deliver seamless mobile experiences directly to your users' devices. We build high-performance mobile applications with offline synchronization, biometric authentication, push notification engines, and store submission compliance.",
    tags: ["React Native", "iOS Native", "Android", "Flutter", "Push Notifications", "App Store Compliance"],
    specs: [
      { label: "Frame Rate", value: "60 FPS Fluid UI" },
      { label: "Platforms", value: "iOS & Android Unified" },
      { label: "Push Engine", value: "Firebase / APNs" },
      { label: "Offline Storage", value: "Local SQLite Engine" },
    ],
    deliverables: [
      { title: "Cross-Platform React Native / Flutter App", desc: "Single performant codebase targeting both Apple App Store and Google Play." },
      { title: "Native Device API Integration", desc: "Camera access, GPS tracking, Biometrics (FaceID/TouchID), and Bluetooth." },
      { title: "Real-Time Push Engine", desc: "Automated event-triggered push notifications and segmented in-app messaging." },
      { title: "Offline Sync Engine", desc: "Local database caching ensuring uninterrupted functionality without network access." },
      { title: "App Store Publishing", desc: "Handling complete submission, compliance checks, screenshots, and metadata setup." },
    ],
    process: [
      { step: "01", title: "Mobile UX & Prototype", desc: "Designing mobile-first wireframes, gestures, and user interaction flows." },
      { step: "02", title: "App Architecture & APIs", desc: "Setting up cross-platform codebase, state management, and backend endpoints." },
      { step: "03", title: "Native Feature Integration", desc: "Connecting camera, location, biometrics, and push notification services." },
      { step: "04", title: "Multi-Device Testing", desc: "Testing across physical iOS and Android smartphones and tablets." },
      { step: "05", title: "App Store Approval", desc: "Submitting binaries to Apple App Store and Google Play for public release." },
    ],
    type: "phone",
  },
  "site-support": {
    slug: "site-support",
    title: "Website Support & 24/7 SLA Engineering",
    category: "Infrastructure & Security",
    tagline: "Continuous performance monitoring, zero-downtime security patching, and guaranteed response SLAs.",
    description:
      "Ensure your critical digital infrastructure remains fast, secure, and always online. Our dedicated maintenance engineers provide proactive security monitoring, database optimization, and instant emergency resolution.",
    tags: ["24/7 Monitoring", "Security Audits", "Core Web Vitals", "Zero-Downtime Migration", "Backup Systems"],
    specs: [
      { label: "Uptime SLA", value: "99.99% Guaranteed" },
      { label: "Incident SLA", value: "< 15 Min Emergency" },
      { label: "Security Scans", value: "Automated Daily" },
      { label: "Backups", value: "Hourly Offsite Backups" },
    ],
    deliverables: [
      { title: "Real-Time Uptime & Health Monitoring", desc: "24/7 automated ping, latency tracking, and SSL certificate renewal." },
      { title: "Hourly Offsite Backups", desc: "Automated snapshot backups stored securely on isolated AWS S3 buckets." },
      { title: "Core Web Vitals Maintenance", desc: "Continuous code audits to prevent PageSpeed degradation over time." },
      { title: "Security Patching & WAF", desc: "Regular dependency updates, vulnerability patching, and firewall rules." },
      { title: "Dedicated Engineering Lead", desc: "Direct Slack channel and prioritized ticketing for instant technical assistance." },
    ],
    process: [
      { step: "01", title: "Infrastructure & Code Audit", desc: "Comprehensive audit of existing hosting, code quality, and security risks." },
      { step: "02", title: "Monitoring Setup", desc: "Deploying telemetry probes, error log aggregators, and alert triggers." },
      { step: "03", title: "Backup & WAF Configuration", desc: "Setting up automated backup scripts and Cloudflare Web Application Firewall." },
      { step: "04", title: "Proactive Optimization", desc: "Applying initial database index tuning, image compression, and cache rules." },
      { step: "05", title: "Ongoing Monthly SLA", desc: "Delivering monthly security reports, software updates, and 24/7 availability." },
    ],
    type: "laptop-stone",
  },
  "redesign": {
    slug: "redesign",
    title: "Redesign & Architecture Modernization",
    category: "Legacy System Transformation",
    tagline: "Transform outdated legacy monoliths into modern, cloud-native web platforms with zero downtime.",
    description:
      "Outdated software hurts conversions and developer velocity. We refactor legacy codebases, modernize UI/UX designs, and migrate monolithic applications into decoupled cloud-native architectures with complete data preservation.",
    tags: ["Code Audit", "Cloud Refactoring", "UX Modernization", "Database Re-indexing", "Zero Data Loss", "React"],
    specs: [
      { label: "Data Integrity", value: "100% Guaranteed" },
      { label: "Cutover Risk", value: "Zero-Downtime DNS" },
      { label: "PageSpeed Gain", value: "+65 Points Average" },
      { label: "Tech Stack", value: "Modern Next.js Architecture" },
    ],
    deliverables: [
      { title: "Legacy Codebase Audit", desc: "Deep-dive analysis of technical debt, security vulnerabilities, and bottleneck areas." },
      { title: "Modern UI/UX Redesign", desc: "Complete visual refresh aligned with current design standards and mobile usability." },
      { title: "Data Normalization & Migration", desc: "Transferring legacy SQL/NoSQL databases to modern relational structures with zero loss." },
      { title: "API Refactoring & Cloud Migration", desc: "Converting monolithic server setups to serverless or containerized microservices." },
      { title: "SEO 301 Redirect Strategy", desc: "Preserving search engine rankings through comprehensive URL mapping and redirects." },
    ],
    process: [
      { step: "01", title: "Technical Debt & UX Audit", desc: "Evaluating current performance, user drop-offs, and backend bottlenecks." },
      { step: "02", title: "Target Architecture Design", desc: "Planning new tech stack, API boundaries, and database schema migration." },
      { step: "03", title: "Frontend & Backend Refactoring", desc: "Building the new modern platform in parallel with existing legacy operations." },
      { step: "04", title: "Staging & Data Parity Check", desc: "Rigorous testing to ensure 100% data parity between old and new systems." },
      { step: "05", title: "Zero-Downtime DNS Switch", desc: "Executing seamless cutover with zero service disruption for active users." },
    ],
    type: "laptop-hand",
  },
  "seo": {
    slug: "seo",
    title: "Search Engine Optimization (SEO)",
    category: "Organic Traffic & Technical Rankings",
    tagline: "Dominant organic search rankings engineered through technical SEO, schema data, and PageSpeed 95+.",
    description:
      "Achieve sustainable top rankings on search engines with engineering-driven technical SEO. We optimize website architecture, implement structured schema markup, and maximize PageSpeed scores to capture high-intent organic traffic.",
    tags: ["Technical Audit", "Semantic Schema", "PageSpeed 95+", "Content Strategy", "High-Intent Rankings", "JSON-LD"],
    specs: [
      { label: "Target PageSpeed", value: "95+ Mobile & Desktop" },
      { label: "Schema Coverage", value: "Full JSON-LD Integration" },
      { label: "Indexing Rate", value: "Instant Google Indexing" },
      { label: "Organic ROI", value: "Proven Ranking Growth" },
    ],
    deliverables: [
      { title: "Technical SEO Audit", desc: "Identifying crawl errors, indexation issues, broken links, and canonical tags." },
      { title: "Structured JSON-LD Schema", desc: "Embedding rich snippet schemas for products, services, organization, and FAQs." },
      { title: "Core Web Vitals Acceleration", desc: "Code-level performance optimization to satisfy Google's page experience signals." },
      { title: "Content Silo & Keyword Strategy", desc: "Structuring site hierarchy to target high-conversion commercial search terms." },
      { title: "Rank Tracking & Telemetry", desc: "Monthly ranking reports, Google Search Console monitoring, and traffic insights." },
    ],
    process: [
      { step: "01", title: "Crawl & Competitor Analysis", desc: "Conducting deep technical crawl and keyword gap analysis against top competitors." },
      { step: "02", title: "Site Architecture & Schema Engineering", desc: "Implementing JSON-LD schemas and fixing crawl budget bottlenecks." },
      { step: "03", title: "On-Page & Speed Acceleration", desc: "Optimizing meta tags, heading structures, images, and server response times." },
      { step: "04", title: "Content Silo Optimization", desc: "Refining core landing page copy for search intent and topical relevance." },
      { step: "05", title: "Monthly Telemetry & Growth", desc: "Monitoring indexation status, impression growth, and top-3 ranking positions." },
    ],
    type: "laptop-saas",
  },
  "software-development": {
    slug: "software-development",
    title: "Custom Software Engineering",
    category: "Enterprise Software",
    tagline: "Bespoke web applications, API integrations, and enterprise software solutions.",
    description:
      "We design and build robust custom software solutions tailored to your unique business logic. From high-load web systems to cloud backend microservices, we deliver secure, reliable code.",
    tags: ["Software Engineering", "Custom Systems", "Cloud APIs", "Enterprise Architecture"],
    specs: [
      { label: "Architecture", value: "Microservices & Cloud" },
      { label: "Code Quality", value: "100% Type-Safe TypeScript" },
      { label: "Security", value: "OWASP Compliant" },
      { label: "Scalability", value: "Auto-scaling Cloud" },
    ],
    deliverables: [
      { title: "Custom Web Application", desc: "Tailored frontend and backend software built specifically for your business logic." },
      { title: "API Integration Layer", desc: "Secure RESTful/GraphQL interfaces connecting all your internal tools." },
      { title: "Database & Cloud Architecture", desc: "Scalable relational or document database clusters hosted on AWS/Vercel." },
    ],
    process: [
      { step: "01", title: "Requirements Analysis", desc: "Defining technical specs, data flow diagrams, and milestones." },
      { step: "02", title: "Agile Development", desc: "Building feature iterations with continuous client review demos." },
      { step: "03", title: "Deployment & Support", desc: "Launching on production infrastructure with ongoing maintenance." },
    ],
    type: "laptop-angled",
  },
  "graphic-design": {
    slug: "graphic-design",
    title: "Graphic Design & Visual Assets",
    category: "Creative Services",
    tagline: "High-impact visual assets, marketing graphics, and brand design.",
    description:
      "Elevate your brand image with custom graphic design. We create stunning visual identity assets, promotional graphics, visual identity guidelines, and digital media.",
    tags: ["Graphic Design", "Branding", "Visual Media", "Social Assets"],
    specs: [
      { label: "Asset Format", value: "Vector & 4K Digital" },
      { label: "Licensing", value: "Full Commercial Ownership" },
      { label: "Figma Library", value: "Included" },
    ],
    deliverables: [
      { title: "Brand Identity Assets", desc: "Logos, brand guidelines, typography systems, and social media kits." },
      { title: "Marketing & Ad Graphics", desc: "High-converting digital banner ads, presentation decks, and visual graphics." },
    ],
    process: [
      { step: "01", title: "Creative Brief", desc: "Understanding brand aesthetic goals and visual preferences." },
      { step: "02", title: "Design Concepts", desc: "Creating initial design variations and iterating on feedback." },
      { step: "03", title: "Final Asset Delivery", desc: "Exporting high-resolution vector and digital files." },
    ],
    type: "phone",
  },
  "digital-marketing": {
    slug: "digital-marketing",
    title: "Digital Marketing & Growth",
    category: "Performance Marketing",
    tagline: "Data-driven marketing campaigns, PPC routing, and conversion rate optimization.",
    description:
      "Drive qualified traffic and revenue growth with performance-focused digital marketing campaigns. We optimize ad spend, landed page conversion flows, and customer acquisition channels.",
    tags: ["PPC", "Growth Marketing", "Social Media Ads", "Conversion Rate"],
    specs: [
      { label: "ROI Tracking", value: "Real-Time Telemetry" },
      { label: "Ad Channels", value: "Google, Meta, LinkedIn" },
      { label: "Targeting", value: "High-Intent Audience" },
    ],
    deliverables: [
      { title: "PPC & Ad Campaign Setup", desc: "Targeted advertising across Google Search, Meta, and LinkedIn." },
      { title: "Landing Page Conversion Tuning", desc: "A/B testing landing page copy and CTA buttons to maximize conversions." },
    ],
    process: [
      { step: "01", title: "Audience Audit", desc: "Analyzing target demographics and competitor ad strategies." },
      { step: "02", title: "Campaign Launch", desc: "Deploying targeted ad creative and monitoring initial CTR signals." },
      { step: "03", title: "Continuous Optimization", desc: "Scaling high-performing ad sets and tuning ROAS." },
    ],
    type: "laptop-saas",
  },
  "3d-animation": {
    slug: "3d-animation",
    title: "3D Animation & CGI Rendering",
    category: "3D & Motion Graphics",
    tagline: "Photorealistic 3D product renders and cinematic CGI commercial animation.",
    description:
      "Bring product ideas to life with photorealistic 3D rendering and motion animation. Perfect for high-impact commercial advertisements, product launches, and interactive web graphics.",
    tags: ["3D Animation", "CGI", "Product Renders", "WebGL"],
    specs: [
      { label: "Render Quality", value: "4K Photorealistic" },
      { label: "Formats", value: "MP4, WebM, WebGL" },
      { label: "Commercial License", value: "Full Rights Included" },
    ],
    deliverables: [
      { title: "4K 3D Product Renders", desc: "High-resolution studio renders from multiple angles for web and marketing." },
      { title: "CGI Commercial Video", desc: "Cinematic animated product showcase videos with professional lighting." },
    ],
    process: [
      { step: "01", title: "3D Modeling", desc: "Creating precise 3D CAD/mesh models of products." },
      { step: "02", title: "Lighting & Materials", desc: "Applying photorealistic textures, glass, metals, and lighting studio setups." },
      { step: "03", title: "Rendering & Delivery", desc: "Exporting high-resolution 4K frames and video clips." },
    ],
    type: "laptop-stone",
  },
};

function getFallbackService(slug: string): ServiceDetailData | null {
  if (SERVICES_DATABASE[slug]) {
    return SERVICES_DATABASE[slug];
  }
  // Try finding case-insensitive or partial matches
  const foundKey = Object.keys(SERVICES_DATABASE).find(
    (key) => key.toLowerCase() === slug.toLowerCase() || slug.toLowerCase().includes(key.toLowerCase())
  );
  if (foundKey) {
    return SERVICES_DATABASE[foundKey];
  }
  return null;
}

export default async function SingleServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const cmsService = await getServiceBySlug(params.slug).catch(() => null);

  let serviceData: ServiceDetailData | null = null;

  if (cmsService && cmsService.title) {
    const fallback = getFallbackService(params.slug);
    serviceData = {
      slug: cmsService.slug?.current || params.slug,
      title: cmsService.title,
      category: cmsService.category || fallback?.category || "Core Service",
      tagline: cmsService.excerpt || fallback?.tagline || "High-performance technical service offering.",
      description: cmsService.description || fallback?.description || "Detailed overview of our service and technical capabilities.",
      tags: cmsService.tags && cmsService.tags.length > 0 ? cmsService.tags : fallback?.tags || ["Engineering", "Development"],
      specs: fallback?.specs || [
        { label: "Architecture", value: "Modern Cloud Native" },
        { label: "Quality Standard", value: "100% Production Grade" },
      ],
      deliverables: fallback?.deliverables || [
        { title: "Technical Solution", desc: "Custom engineered implementation built to project specifications." },
      ],
      process: fallback?.process || [
        { step: "01", title: "Discovery", desc: "Requirements analysis and project scoping." },
        { step: "02", title: "Execution", desc: "Agile engineering and development." },
        { step: "03", title: "Launch", desc: "Deployment and SLA support." },
      ],
      image: cmsService.image,
      type: fallback?.type || "laptop-angled",
    };
  } else {
    serviceData = getFallbackService(params.slug);
  }

  if (!serviceData) {
    notFound();
  }

  return <SingleServiceClient service={serviceData} />;
}
