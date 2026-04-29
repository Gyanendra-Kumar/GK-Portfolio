// All portfolio content lives here — every section is configurable.
// Later this will be swapped for backend-driven data.

export const personal = {
  name: "Gyanendra Kumar",
  firstName: "Gyanendra",
  lastName: "Kumar",
  initials: "GK",
  title: "Frontend Engineer",
  location: "Pune, India",
  email: "kgyanendra1998@gmail.com",
  phone: "+91 96113 59759",
  tagline:
    "I build fast, scalable, pixel-precise interfaces with React & Next.js.",
  summary:
    "Frontend Developer with 6+ years of overall IT experience, including 5 years crafting production-grade interfaces with React, Next.js, JavaScript and TypeScript. I specialize in data-dense dashboards, performance optimization, and reusable design systems — writing clean, maintainable code that scales with teams.",
  typingRoles: [
    "Frontend Engineer",
    "React Specialist",
    "Next.js Developer",
    "UI Architect",
  ],
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/gyanendra-kumar-22975b18b/",
      icon: "Linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/Gyanendra-Kumar",
      icon: "Github",
    },
    { label: "Email", href: "mailto:kgyanendra1998@gmail.com", icon: "Mail" },
  ],
  stats: [
    { label: "YOE in IT Experience", value: "6+" },
    { label: "YOE in Frontend Development", value: "5" },
    { label: "Dashboards shipped", value: "12" },
    { label: "Load-time improvement", value: "50%" },
  ],
};

export const skills = [
  {
    group: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    group: "Frameworks",
    items: ["React.js", "Next.js"],
  },
  {
    group: "State",
    items: ["Redux Toolkit", "Context API", "React Query"],
  },
  {
    group: "Styling",
    items: ["Tailwind CSS", "SCSS", "CSS Modules"],
  },
  {
    group: "UI Libraries",
    items: ["Shadcn UI", "PrimeReact", "Material UI"],
  },
  {
    group: "Testing",
    items: ["Vitest", "Jest", "React Testing Library"],
  },
  {
    group: "APIs",
    items: ["REST", "GraphQL"],
  },
  {
    group: "Tools",
    items: ["Git", "GitLab CI/CD", "Webpack", "Babel", "ESLint", "Jira"],
  },
];

export const skillMeters = [
  { name: "React.js", level: 95 },
  { name: "Next.js", level: 92 },
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 88 },
  { name: "Redux Toolkit", level: 85 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Performance Tuning", level: 87 },
  { name: "Testing (Vitest/Jest)", level: 82 },
  { name: "GraphQL", level: 75 },
];

export const experience = [
  {
    id: "exp-infosys",
    company: "Infosys",
    role: "Senior Associate Consultant",
    location: "Pune, India",
    period: "Jun 2024 — Present",
    current: true,
    bullets: [
      "Delivered 4 executive dashboard applications with Next.js and React.js, implementing optimized data-fetching strategies for large-scale datasets.",
      "Cut application load times by 30–40% through SSR, memoization, and API-call optimization.",
      "Engineered secure frontend modules for the enterprise Security Dashboard, collaborating across teams to enforce high-security UI standards.",
      "Standardized reusable UI component libraries with Shadcn UI + Tailwind, increasing delivery velocity and visual consistency.",
      "Wrote comprehensive unit and integration tests with Vitest and React Testing Library to guard critical business logic.",
      "Mentored junior developers on debugging, code quality, and frontend best practices.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Shadcn UI",
      "Tailwind",
      "Vitest",
    ],
  },
  {
    id: "exp-ibm",
    company: "IBM",
    role: "Associate System Engineer",
    location: "Bengaluru, India",
    period: "Mar 2020 — May 2024",
    current: false,
    bullets: [
      "Built 'VIR' — a React-based data-visualization platform used by 50+ stakeholders to streamline enterprise reporting.",
      "Reduced initial load time by 50% via route-level lazy loading, code splitting, and memoization (useMemo / useCallback).",
      "Migrated core modules of a 12-year-old legacy HTML/CSS/JS app to a modern SPA with React, TypeScript and Redux Toolkit.",
      "Implemented JWT authentication and secure API handling to meet internal compliance standards.",
      "Resolved production issues ~40% faster, partnering with cross-functional teams to maintain application stability.",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "JWT", "REST"],
  },
];

export const projects = [
  {
    id: "p1",
    name: "VIR — Visualization & Insights Reporting",
    tagline: "Enterprise data-viz platform serving 50+ stakeholders.",
    description:
      "A React + Redux Toolkit platform that unified fragmented reporting into one performant, role-based dashboard. Cut initial load by 50% via lazy-loading and memoized render cycles.",
    tags: ["React", "Redux Toolkit", "TypeScript", "D3"],
    metrics: ["50% faster load", "50+ users", "6 report modules"],
    accent: "cyan",
  },
  {
    id: "p2",
    name: "Executive Dashboards Suite",
    tagline: "Four Next.js dashboards for C-suite decisioning.",
    description:
      "SSR-first Next.js dashboards built with Shadcn UI & Tailwind. Optimized data fetching for large datasets and introduced a reusable charting library adopted across teams.",
    tags: ["Next.js", "SSR", "Shadcn UI", "Tailwind"],
    metrics: ["4 dashboards", "30–40% faster", "Reusable chart lib"],
    accent: "amber",
  },
  {
    id: "p3",
    name: "Security Dashboard",
    tagline: "Hardened frontend for enterprise security posture.",
    description:
      "Engineered secure modules with strict CSP, JWT-guarded API calls, and audit-ready UX flows. Collaborated across security and platform teams to ship compliant UI patterns.",
    tags: ["React", "TypeScript", "JWT", "Security"],
    metrics: ["0 high-sev UI CVEs", "Audit ready", "SSO integrated"],
    accent: "cyan",
  },
  {
    id: "p4",
    name: "Design System & Component Library",
    tagline: "One source of truth for UI across products.",
    description:
      "Designed and maintained a Shadcn + Tailwind-based component library with tokens, theming, and Storybook docs — accelerating feature delivery and visual consistency.",
    tags: ["Shadcn UI", "Tailwind", "Storybook", "Design Tokens"],
    metrics: ["40+ components", "Adopted by 4 teams", "Dark/light themes"],
    accent: "amber",
  },
];

export const education = [
  {
    id: "edu1",
    school: "Visvesvaraya Technological University (VTU)",
    degree: "Bachelor of Engineering",
    location: "Bangalore, India",
    period: "Aug 2015 — Jun 2019",
    description:
      "Graduated with a focus on computer science fundamentals, data structures, and web technologies — the foundation of everything I build today.",
  },
];

export const certifications = [
  {
    id: "c1",
    name: "Meta Front-End Developer Professional",
    issuer: "Meta / Coursera",
    year: "2023",
  },
  {
    id: "c2",
    name: "React — The Complete Guide",
    issuer: "Udemy",
    year: "2022",
  },
  {
    id: "c3",
    name: "TypeScript Deep Dive",
    issuer: "Frontend Masters",
    year: "2023",
  },
  {
    id: "c4",
    name: "IBM Agile Explorer",
    issuer: "IBM",
    year: "2021",
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Priya Sharma",
    role: "Engineering Manager, Infosys",
    quote:
      "Gyanendra has an uncanny ability to turn messy requirements into clean, reusable UI. Our executive dashboards shipped on time because of him.",
  },
  {
    id: "t2",
    name: "Arun Menon",
    role: "Staff Engineer, IBM",
    quote:
      "He migrated a decade-old legacy frontend to a modern SPA with almost zero regressions. His performance instincts are top-tier.",
  },
  {
    id: "t3",
    name: "Neha Raj",
    role: "Product Designer",
    quote:
      "A developer who actually cares about design tokens, spacing, and motion. Hand-offs with Gyanendra feel like pair-design sessions.",
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
