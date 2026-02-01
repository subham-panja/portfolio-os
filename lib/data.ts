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
  title: "Senior Software Engineer & Engineering Leader",
  bio: "Results-driven Senior Software Engineer & Engineering Leader with 5+ years of experience building scalable, AI-powered applications. Expert in Python (Flask, FastAPI, Django), full-stack development, and cloud-native architectures.",
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
    role: "Senior Software Engineer & Technical Lead",
    location: "Gurgaon, India",
    period: "Sep 2024 - Present",
    description:
      "Architected 'Bloom' AI paywall ($50K+ ARR) and led CRM squad. Automated payment workflows reducing overhead by 90%.",
    highlights: [
      "Architected and launched Bloom, an AI-enhanced paywall system generating $50K+ ARR",
      "Automated payment workflows, reducing manual operational overhead by 90%",
      "Lead the CRM Engineering Squad of 6 engineers, driving Agile ceremonies and sprint planning",
      "Mentored engineers, improving team velocity by 30% through code reviews and coaching",
      "Designed scalable microservices architecture on AWS with Flask, PostgreSQL, and Redis",
    ],
  },
  {
    id: "atlas",
    company: "AtlasX Inc.",
    role: "Software Developer",
    location: "New York, USA (Remote)",
    period: "May 2023 - Mar 2024",
    description:
      "Migrated AngularJS to Next.js/Remix (50% perf boost). Built AI-driven audit system with Django.",
    highlights: [
      "Migrated legacy AngularJS application to Next.js/Remix, improving page load performance by 50%",
      "Built a custom AI-driven audit and revert system using Django and Python",
      "Developed data ingestion pipelines processing 10,000+ records daily with automated validation",
      "Collaborated to integrate ML models for predictive analytics and deal scoring",
      "Implemented TDD achieving 85%+ code coverage and reducing production bugs by 40%",
    ],
  },
  {
    id: "pixelmind",
    company: "Pixelmind IT Solution",
    role: "Software Developer",
    location: "Bangalore, India",
    period: "Feb 2020 - Apr 2023",
    description:
      "Re-architected backend to multi-tenant Flask/FastAPI. Built real-time chat with WebSockets.",
    highlights: [
      "Re-architected backend from single-tenant to multi-tenant using Flask and FastAPI (30% faster API)",
      "Pioneered an AI-powered feature flag system with intelligent rollout capabilities",
      "Implemented real-time chat system using WebSockets and Redis for 30K+ members",
      "Led technical design sessions and mentored 2 junior developers, accelerating onboarding by 40%",
    ],
  },
  {
    id: "birdie",
    company: "Birdie Health Care",
    role: "Software Developer",
    location: "London, UK (Remote)",
    period: "Jan 2019 - Jan 2020",
    description:
      "Engineered i18n strategy & Kafka event-driven microservices for healthcare platform.",
    highlights: [
      "Engineered comprehensive i18n/l10n strategy enabling expansion to 15+ international markets",
      "Built event-driven microservices with Kafka, handling 100K+ daily healthcare events",
      "Implemented micro-frontend architecture reducing release coordination overhead by 50%",
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
    | "finder"
    | "terminal"
    | "settings"
    | "calendar"
    | "notes"
    | "mail"
    | "photos"
    | "calculator"
    | "weather"
    | "game";
}

export const apps: AppDefinition[] = [
  {
    id: "settings",
    name: "Settings",
    icon: "⚙️",
    color: "#8E8E93",
    type: "settings",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "💻",
    color: "#333333",
    type: "terminal",
  },
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
  {
    id: "calendar",
    name: "Calendar",
    icon: "📅",
    color: "#FF375F",
    type: "calendar",
  },
  {
    id: "notes",
    name: "Notes",
    icon: "📝",
    color: "#FFD60A",
    type: "notes",
  },
  {
    id: "mail",
    name: "Mail",
    icon: "✉️",
    color: "#0A84FF",
    type: "mail",
  },
  {
    id: "photos",
    name: "Photos",
    icon: "📸",
    color: "#BF5AF2",
    type: "photos",
  },
  {
    id: "calculator",
    name: "Calculator",
    icon: "🔢",
    color: "#FF9F0A",
    type: "calculator",
  },
  {
    id: "weather",
    name: "Weather",
    icon: "☀️",
    color: "#30D158",
    type: "weather",
  },
  /*
  {
    id: "game",
    name: "Games",
    icon: "🎮",
    color: "#FF453A",
    type: "game",
  },
  */
];
