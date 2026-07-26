// Single source of truth for all portfolio content. Types live here too —
// ponytail: one cohesive data module beats a dozen near-empty files.

export interface NavItem {
  label: string;
  href: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  focus: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  flow: string;
  skills: string[];
}

export interface Project {
  category: string;
  title: string;
  description: string;
  flow?: string;
  tags: string[];
  link: string;
  featured?: boolean;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: "mail" | "linkedin" | "github";
}

export interface EducationItem {
  degree: string;
  detail: string;
}

export const profile = {
  name: "Gandla Gajendra Kumar",
  firstName: "GANDLA",
  lastName: "GAJENDRA KUMAR",
  role: "Lead Data Engineer × GenAI Builder",
  eyebrow: "DATA PLATFORMS · BI · GENERATIVE AI",
  statement: "The data engineer who ships with AI.",
  heroDescription:
    "I design scalable data platforms, modern BI ecosystems, LLM-powered applications, RAG pipelines and intelligent automations that move reliable data and intelligence to where decisions happen.",
  availability: "Available for select Data, BI and GenAI opportunities",
  location: "Bangalore, India",
  languages: "English · Hindi · Telugu",
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const education: EducationItem[] = [
  { degree: "M.Tech — AI & Neural Networks", detail: "JNTU Hyderabad" },
  { degree: "B.Tech — Computer Science & Engineering", detail: "JNTU Anantapur" },
];

export const experience: ExperienceItem[] = [
  {
    role: "Lead — Data Engineering & BI Analytics",
    company: "Kenvue (formerly Johnson & Johnson)",
    period: "Jan 2023 – Present",
    focus: [
      "Tableau-to-Power BI transformation",
      "SQL-to-Python & Spark modernisation",
      "Databricks implementation",
      "AWS-to-Azure migration",
      "Data Engineering & BI leadership",
      "Platform performance & cost optimisation",
    ],
  },
  {
    role: "Senior Analyst & BI Expert",
    company: "Johnson & Johnson Pvt. Ltd.",
    period: "Jun 2018 – Dec 2022",
    focus: [
      "BI strategy",
      "Advanced analytics",
      "Dynamic reporting",
      "Enterprise stakeholder collaboration",
      "Decision-support systems",
    ],
  },
  {
    role: "BI Expert / Tableau Developer",
    company: "Costco",
    period: "Dec 2016 – May 2018",
    focus: [
      "Interactive Tableau dashboards",
      "Multi-source data integration",
      "Performance tuning",
      "End-user training",
      "Self-service analytics",
    ],
  },
  {
    role: "Oracle DBA",
    company: "Virtusa Consulting Services",
    period: "Jul 2013 – Nov 2016",
    focus: [
      "Oracle administration",
      "Performance tuning",
      "Security & disaster recovery",
      "Database reliability",
      "Technical documentation",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "genai",
    title: "GenAI & Automation",
    flow: "Prompt → Retrieve → Reason → Automate",
    skills: [
      "Large language models",
      "Claude",
      "GPT",
      "Gemini",
      "Open-source models",
      "Retrieval-augmented generation",
      "Vector search",
      "LangGraph",
      "Multi-agent systems",
      "Prompt engineering",
      "Claude Code",
      "AI-assisted development",
      "n8n automation",
      "Voice agents",
    ],
  },
  {
    id: "data",
    title: "Data Engineering",
    flow: "Ingest → Transform → Model → Serve",
    skills: [
      "Databricks",
      "PySpark",
      "Apache Spark",
      "Snowflake",
      "Azure Data Factory",
      "Azure Synapse",
      "Amazon Redshift",
      "BigQuery",
      "SQL Server",
      "PostgreSQL",
      "Oracle",
      "Vertica",
      "Data modelling",
      "Cloud migration",
    ],
  },
  {
    id: "bi",
    title: "BI & Visualisation",
    flow: "Model → Measure → Visualise → Decide",
    skills: [
      "Power BI Desktop",
      "Power BI Service",
      "Tableau Desktop",
      "Tableau Server",
      "Tableau Prep",
      "Alteryx",
      "DOMO",
      "KNIME",
      "Semantic modelling",
      "DAX",
      "Power Query",
      "Executive dashboards",
      "BI governance",
      "Data storytelling",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Engineering Foundations",
    flow: "Design → Build → Observe → Scale",
    skills: [
      "Microsoft Azure",
      "AWS",
      "Python",
      "Scala",
      "Git",
      "Bitbucket",
      "APIs",
      "Data architecture",
      "Machine learning",
      "Statistics",
      "System design",
      "Observability",
      "Performance optimisation",
    ],
  },
];

export const projects: Project[] = [
  {
    category: "Migration Intelligence",
    title: "Tableau-to-Power BI Migration Intelligence Platform",
    description:
      "An AI-assisted and deterministic migration platform that analyses Tableau .twb and .twbx workbooks, extracts calculations and metadata, builds an intermediate representation and dependency graph, translates supported logic into DAX, Power Query and Power BI structures, and generates migration-ready outputs.",
    flow: "TWBX → Parser → Intermediate Representation → Dependency Graph → Translation → PBIP/TMDL",
    tags: [
      "Python",
      "Tableau",
      "Power BI",
      "DAX",
      "Power Query",
      "PBIP",
      "TMDL",
      "Graph Processing",
    ],
    link: "https://github.com/Gandla-Gajendrakumar",
    featured: true,
  },
  {
    category: "Multi-Model Reasoning",
    title: "LLM Council",
    description:
      "A multi-model reasoning application where several language models independently analyse a difficult question, evaluate different perspectives and collaborate on a more considered final response.",
    tags: ["LLMs", "Multi-model orchestration", "Consensus", "Reasoning", "AI agents"],
    link: "https://github.com/Gandla-Gajendrakumar/llm-council",
  },
  {
    category: "Applied AI",
    title: "LLM Application Lab",
    description:
      "A collection of applied AI projects involving RAG, AI agents, document intelligence, voice systems, API integrations, SQL assistants and practical LLM workflows.",
    tags: ["OpenAI", "Claude", "Gemini", "RAG", "Vector databases", "Voice AI", "Agents"],
    link: "https://github.com/Gandla-Gajendrakumar/awesome-llm-apps",
  },
  {
    category: "Healthcare Analytics",
    title: "Patient Readmission Predictor",
    description:
      "A healthcare predictive-analytics project that identifies patient readmission risk and supports earlier, better-informed intervention and hospital-resource planning.",
    tags: ["Healthcare analytics", "Machine learning", "Gradient boosting", "Risk prediction", "Python"],
    link: "https://github.com/Gandla-Gajendrakumar/Readmission_Predictor",
  },
  {
    category: "Open Source",
    title: "Open-Source Experiments",
    description:
      "A growing collection of AI, Data Engineering, BI, automation and software-development experiments published through GitHub.",
    tags: ["Learning", "Prototypes", "Open source", "Data & AI"],
    link: "https://github.com/Gandla-Gajendrakumar",
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "gajendra.gandla@gmail.com",
    href: "mailto:gajendra.gandla@gmail.com",
    icon: "mail",
  },
  {
    label: "LinkedIn",
    value: "in/gajendra-kumar-gandla",
    href: "https://www.linkedin.com/in/gajendra-kumar-gandla",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    value: "Gandla-Gajendrakumar",
    href: "https://github.com/Gandla-Gajendrakumar",
    icon: "github",
  },
];

export const currentFocus: string[] = [
  "AI-native data products",
  "LLM-powered enterprise applications",
  "Retrieval-augmented generation",
  "Multi-agent systems",
  "Data-platform intelligence",
  "Workflow automation",
  "Vibe coding",
  "AI-assisted software delivery",
  "Tableau-to-Power BI migration automation",
];

export const architectureFlow: string[] = [
  "Enterprise Sources",
  "Data Engineering",
  "Trusted Data Platform",
  "Semantic & Retrieval Layer",
  "LLMs, RAG & Agents",
  "Applications & Automation",
  "Business Decisions",
];

export const VIDEO_SRC = "/videos/gajendra-portfolio-intro.mp4";
export const VIDEO_POSTER = "/images/video-poster.svg";
