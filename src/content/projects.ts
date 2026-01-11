import { LucideIcon } from 'lucide-react';
import { Briefcase, Boxes, Film, Brain, ShieldCheck, Zap, MonitorPlay } from 'lucide-react';

export type ProjectStatus = 'Live' | 'Active' | 'Beta' | 'Planning' | 'Private';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  targetAudience: string;
  trustFeatures: string[];
  status: ProjectStatus;
  statusColor: string; // Tailwind color class helper
  tags: string[];
  links: {
    label: string;
    url: string;
    primary?: boolean;
  }[];
  icon?: any; // Lucide icon or similar
}

export const projects: Project[] = [
  {
    id: 'jobbridge',
    title: 'JobBridge',
    shortDescription: 'Pocket-money jobs done safely.',
    fullDescription: 'A platform connecting teens, parents, and clients/organizations. Emphasizing safety, verification, role clarity, and a privacy-first approach.',
    targetAudience: 'Teens, Parents, and Neighbors',
    trustFeatures: ['Identity Verification', 'Parental Oversight', 'Secure Payments'],
    status: 'Live',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    tags: ['Platform', 'SaaS', 'Safety', 'Youth'],
    links: [
      { label: 'Marketing Site', url: 'https://jobbridge.app', primary: true },
      { label: 'Platform App', url: 'https://app.jobbridge.app' },
    ],
    icon: Briefcase,
  },
  {
    id: 'rzn-services',
    title: 'RZN Services',
    shortDescription: 'German digital consulting, built to move companies forward.',
    fullDescription: 'Digital transformation, AI enablement, automation, product strategy, and UX/design systems. High trust, clarity, and measurable outcomes.',
    targetAudience: 'SMEs & Enterprises',
    trustFeatures: ['10+ Years Experience', 'Agile Methodology', 'Measurable ROI'],
    status: 'Active',
    statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    tags: ['Consulting', 'Digital Transformation', 'AI', 'UX'],
    links: [],
    icon: Boxes,
  },
  {
    id: 'ray-media',
    title: 'Ray Media',
    shortDescription: 'A research-driven media & production arm.',
    fullDescription: 'Developing formats and capabilities. Currently private/stealth.',
    targetAudience: 'Global Audiences',
    trustFeatures: ['Research-Driven', 'High Production Value'],
    status: 'Planning',
    statusColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    tags: ['Media', 'Research', 'Production'],
    links: [],
    icon: Film,
  },
  {
    id: 'conclave',
    title: 'Conclave',
    shortDescription: 'Multi-agent AI collaboration for critical answers.',
    fullDescription: 'The best way to use AI for critical answers: multiple frontier models collaborate, critique each other, then a “Chairman” synthesizes a final answer. Rigorous, explicable, safe.',
    targetAudience: 'Researchers & Analysts',
    trustFeatures: ['Multi-Model Verification', 'Safety-First', 'Transparent Logic'],
    status: 'Private',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    tags: ['AI', 'LLM', 'Multi-Agent', 'Safety'],
    links: [],
    icon: Brain,
  },
];
