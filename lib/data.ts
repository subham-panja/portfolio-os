// Resume data for Subham Panja
export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  impact: string;
  icon: string;
  color: string;
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

export interface Contact {
  type: string;
  value: string;
  link: string;
  icon: string;
}

export const profileData = {
  name: "Subham Panja",
  title: "Senior Software Engineer & Technical Lead",
  bio: "Results-driven Engineering Leader with 5+ years of experience building scalable, AI-powered applications. Expert in Python, Full-Stack Development, and Cloud-Native Architectures. Based in Gurgaon, India.",
  stats: [
    { label: "Years Exp", value: "5+" },
    { label: "Efficiency Gains", value: "40%" },
    { label: "ARR Products", value: "$50K+" },
  ],
  email: "subhampanja28@gmail.com",
  phone: "+91-9883250237",
  linkedin: "https://linkedin.com/in/subhampanja",
  github: "https://github.com/subham-panja",
};

export const experiences: Experience[] = [
  {
    id: "spring",
    company: "Spring Financial Inc.",
    role: "Senior Software Engineer & Tech Lead",
    location: "Toronto, Canada (Remote)",
    period: "2023 - Present",
    description:
      "Architected 'Bloom' AI paywall system, lead CRM squad of 6 engineers, automated payment workflows reducing overhead by 90%.",
    highlights: [
      "Designed AI-enhanced paywall generating $50K+ ARR",
      "Lead cross-functional CRM squad of 6 engineers",
      "Automated payment workflows with 90% cost reduction",
      "Implemented event-driven architecture with Kafka",
    ],
  },
  {
    id: "atlas",
    company: "AtlasX Inc.",
    role: "Software Developer",
    location: "New York (Remote)",
    period: "2022 - 2023",
    description:
      "Migrated AngularJS to Next.js/Remix (50% perf boost). Built AI-driven audit system with Django.",
    highlights: [
      "Migrated legacy AngularJS to Next.js/Remix",
      "Achieved 50% performance improvement",
      "Built AI-driven audit logging system",
      "Implemented real-time data pipelines",
    ],
  },
  {
    id: "pixelmind",
    company: "Pixelmind IT Solutions",
    role: "Full Stack Developer",
    location: "India",
    period: "2021 - 2022",
    description:
      "Re-architected backend to multi-tenant Flask/FastAPI. Built real-time chat with WebSockets.",
    highlights: [
      "Re-architected to multi-tenant architecture",
      "Built real-time chat using WebSockets",
      "Implemented Flask/FastAPI microservices",
      "Designed scalable database schemas",
    ],
  },
  {
    id: "birdie",
    company: "Birdie Health Care",
    role: "Software Engineer",
    location: "London (Remote)",
    period: "2020 - 2021",
    description:
      "Engineered i18n strategy & Kafka event-driven microservices for healthcare platform.",
    highlights: [
      "Engineered comprehensive i18n strategy",
      "Built Kafka event-driven microservices",
      "HIPAA-compliant healthcare solutions",
      "Served 50K+ active patients",
    ],
  },
  {
    id: "pixlbea",
    company: "Pixlbea Technologies",
    role: "Software Developer",
    location: "Noida, India (Remote)",
    period: "2021 - 2022",
    description:
      "Designed LLD/HLD for multi-vendor e-commerce backend and optimized MongoDB schemas.",
    highlights: [
      "Designed LLD and HLD documentation",
      "Optimized MongoDB schemas (35% faster queries)",
      "Implemented automated testing on AWS EC2",
    ],
  },
  {
    id: "webarion",
    company: "Webarion Technologies",
    role: "Frontend Developer",
    location: "Kolkata, India",
    period: "2020",
    description:
      "Contributed to social media app development using React.js, Redux, and Node.js.",
    highlights: [
      "Developed social media application features",
      "Created reusable UI component library",
      "Accelerated feature development",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "bloom",
    name: "Bloom",
    description:
      "AI-enhanced paywall system generating $50K+ ARR with intelligent user segmentation and dynamic pricing.",
    tech: ["Python", "FastAPI", "React", "AWS", "AI/ML"],
    impact: "$50K+ ARR",
    icon: "🌸",
    color: "#FF375F",
  },
  {
    id: "real-estate",
    name: "Real Estate AI Pipeline",
    description:
      "ML-based deal scoring & predictive analytics platform for real estate investment decisions.",
    tech: ["Flask", "React", "AWS", "TensorFlow", "PostgreSQL"],
    impact: "40% Better Predictions",
    icon: "🏠",
    color: "#30D158",
  },
  {
    id: "healthcare",
    name: "Healthcare Platform",
    description:
      "HIPAA-compliant healthcare platform serving 50K+ patients with real-time monitoring.",
    tech: ["NestJS", "Kafka", "React", "PostgreSQL", "Redis"],
    impact: "50K+ Patients",
    icon: "🏥",
    color: "#0A84FF",
  },
  {
    id: "gym",
    name: "Gym Management SaaS",
    description:
      "AI-driven analytics & scheduling platform for fitness centers with mobile apps.",
    tech: ["Django", "React Native", "AWS", "AI/ML"],
    impact: "500+ Gyms",
    icon: "💪",
    color: "#FF9F0A",
  },
];

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Go", "Dart", "PHP", "SQL"],
    icon: "💻",
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Remix", "Flutter", "React Native"],
    icon: "🎨",
  },
  {
    category: "Backend",
    items: ["Flask", "FastAPI", "Django", "Node.js", "NestJS", "Laravel"],
    icon: "⚙️",
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (EC2, Lambda)", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    icon: "☁️",
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
    icon: "🗄️",
  },
  {
    category: "AI & ML",
    items: ["TensorFlow", "PyTorch", "OpenAI", "LangChain"],
    icon: "🤖",
  },
];

export const contacts: Contact[] = [
  {
    type: "Email",
    value: "subhampanja28@gmail.com",
    link: "mailto:subhampanja28@gmail.com",
    icon: "📧",
  },
  {
    type: "Phone",
    value: "+91-9883250237",
    link: "tel:+919883250237",
    icon: "📱",
  },
  {
    type: "LinkedIn",
    value: "/in/subhampanja",
    link: "https://linkedin.com/in/subhampanja",
    icon: "💼",
  },
  {
    type: "GitHub",
    value: "/subham-panja",
    link: "https://github.com/subham-panja",
    icon: "🐙",
  },
];

// App definitions for desktop and mobile
export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  type:
    | "about"
    | "experience"
    | "projects"
    | "techstack"
    | "contact"
    | "finder";
}

export const apps: AppDefinition[] = [
  {
    id: "about",
    name: "About Me",
    icon: "👤",
    color: "#0A84FF",
    type: "about",
  },
  {
    id: "experience",
    name: "Experience",
    icon: "💼",
    color: "#FF9F0A",
    type: "experience",
  },
  {
    id: "projects",
    name: "Projects",
    icon: "📁",
    color: "#30D158",
    type: "projects",
  },
  {
    id: "techstack",
    name: "Tech Stack",
    icon: "⚙️",
    color: "#BF5AF2",
    type: "techstack",
  },
  {
    id: "contact",
    name: "Contact",
    icon: "📧",
    color: "#FF375F",
    type: "contact",
  },
];
