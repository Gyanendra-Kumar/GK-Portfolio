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
    { label: "Dashboards shipped", value: "7" },
    { label: "Load-time improvement", value: "40%" },
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
      "Delivered 4 large-scale enterprise dashboards (including Security Compliance and SOX Alerts) using Next.js and React.js, strategically balancing SSR and CSR and optimizing 14 concurrent API calls to reduce initial load times by 40% (from 10s down to 6s).",
      "Engineered high-performance data grids by implementing paginated API calls and UI virtualization, enabling users to efficiently render, filter, and download over 150,000 quarterly records without browser degradation.",
      "Architected automated access validation workflows and custom ADOM RBAC, leveraging full-stack capabilities—including Next.js API routes, Server Actions, and Drizzle ORM—to enforce enterprise security posture and prevent endpoint conflicts.",
      "Standardized reusable UI component libraries with Shadcn UI and Tailwind CSS, ensuring production stability by integrating comprehensive Vitest and React Testing Library suites.",
      "Accelerated feature delivery and streamlined release cycles by leveraging AI coding agents (GitHub Copilot, Devin), while actively mentoring junior developers on debugging, code quality, and full-stack best practices.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "SSR",
      "Shadcn UI",
      "Tailwind",
      "Jest/Vitest",
      "React Testing Library",
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
      "Led the modernization of 'VIR'—a legacy enterprise reporting application—into a highly optimized React platform, architecting 50+ dynamic forms to streamline workflows and improve initial load times by 40-50%.",
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
    id: "p5",
    name: "SOX Alerts Dashboard",
    tagline:
      "High-performance alert monitoring platform replacing legacy email workflows.",
    description:
      "Architected a centralized dashboard with custom ADOM RBAC to resolve email fatigue from automated bot alerts. Engineered hierarchical UI accordions for seamless data drill-down, implementing pagination and UI virtualization to efficiently render, filter, and download over 150,000 records per quarter.",
    tags: [
      "Next.js",
      "React.js",
      "Typescript",
      "Virtualization",
      "RBAC",
      "Performance",
    ],
    metrics: [
      "150K+ records/quarter",
      "UI Virtualization",
      "ADOM RBAC",
      "2 platform migrations",
    ],
    accent: "amber",
  },
  {
    id: "p6",
    name: "SOX Conflict Identification Dashboard",
    tagline:
      "Full-stack automated access validation and conflict prevention tool.",
    description:
      "Developed an end-to-end Next.js application to eliminate manual access provisioning errors. The system captures employee details and target endpoints, triggering custom API routes to evaluate the request against four distinct conflict scenarios using Drizzle ORM, ensuring enterprise compliance and preventing security violations.",
    tags: ["Next.js", "React.js", "TypeScript", "Drizzle ORM", "SCSS"],
    metrics: [
      "4 validation scenarios",
      "Full-stack delivery",
      "Automated compliance",
      "2 platform migrations",
    ],
    accent: "cyan",
  },
  {
    id: "p7",
    name: "Security Compliance Dashboard",
    tagline:
      "Executive-level compliance visualization and hierarchical reporting platform.",
    description:
      "Led the modernization and multi-phase migration of an enterprise compliance reporting tool. Engineered a complex organizational filtering hierarchy utilizing Cube.dev and Drizzle ORM, and optimized data fetching strategies to efficiently orchestrate 14 simultaneous API calls—reducing initial dashboard load time by 40% (from 10 seconds down to 6 seconds).",
    tags: [
      "Next.js",
      "React.js",
      "Redux Toolkit",
      "Cube.dev",
      "Drizzle ORM",
      "TypeScript",
    ],
    metrics: [
      "40% faster load time",
      "14 concurrent APIs",
      "2 platform migrations",
    ],
    accent: "cyan",
  },
  {
    id: "p1",
    name: "VIR — Visualization & Insights Reporting",
    tagline:
      "Large-scale enterprise reporting platform managing 50+ dynamic forms.",
    description:
      "Spearheaded the end-to-end migration of a legacy HTML/JS system into a highly optimized React application. Architected a scalable form engine utilizing React Hook Form and implemented route-level lazy loading to render 50+ complex data-entry modules strictly on-demand, driving a 40–50% improvement in initial application load times.",
    tags: ["React", "React Hook Form", "Lazy Loading", "SCSS"],
    metrics: ["50+ dynamic forms", "40-50% faster load", "On-demand rendering"],
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
  {
    id: "edu2",
    school: "N.K.S.M College",
    degree: "12th Grade(HSC)",
    location: "Bihar, India",
    period: "2015",
    description:
      "Studied science and mathematics, developing a strong foundation in analytical and problem-solving skills.",
  },
  {
    id: "edu3",
    school: "Public School Bela Darbhanga",
    degree: "12th Grade(HSC)",
    location: "Bihar, India",
    period: "2012",
    description: "",
  },
];

export const certifications = [
  {
    id: "c1",
    name: "Data Structures & Algorithms",
    issuer: "Scaler",
    year: "2024",
  },
  {
    id: "c2",
    name: "React IBM Training",
    issuer: "IBM Learning",
    year: "2022",
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Bukkana Sirisha",
    role: "Technology Lead @ Infosys | Generative AI, LLMOps, RAG | Spring Microservices",
    quote:
      "I highly recommend Gyanendra... I had the opportunity to work closely with him in both Sox alerts dashboard and Security Jira automation UI. I am very much impressed by his strong... problem solving skills. Gyanendra has a solid command of React js & NextJs for building scalable, responsive and user friendly interfaces... With the support of Gyanendra we both delivered the tasks and project deliverables without any client escalations. Any organization would greatly benefit from having him on board.",
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
