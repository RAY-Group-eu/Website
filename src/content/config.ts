
import { ShieldCheck, Zap, MonitorPlay, Globe, Cpu, Smartphone, BrainCircuit } from 'lucide-react';

export const siteConfig = {
    name: "Ray Group",
    shortDescription: "A venture studio building trustworthy digital products.",
    fullDescription: "Ray Group is a venture studio dedicated to building digital products that matter. We combine high-end engineering with cinematic design to create software that feels alive.",
    domain: "ray-group.eu",
    founder: "Rezan Yalçin",
    nav: [
        { name: 'About', href: '#principles' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '/contact' },
    ],
    footer: {
        legal: [
            { name: 'Imprint', href: '/legal/imprint' },
            { name: 'Privacy Policy', href: '/legal/privacy' },
            { name: 'Terms of Service', href: '/legal/terms' },
            { name: 'Cookie Policy', href: '/legal/cookies' },
        ]
    }
};

export const principles = [
    {
        id: 'trust',
        title: 'Trust is engineered',
        description: 'We build systems that respect user data, prioritize privacy, and deliver robust security by default. No black boxes.',
        icon: ShieldCheck,
    },
    {
        id: 'ai',
        title: 'Responsible AI',
        description: 'Harnessing the power of intelligence without losing human control. The council of models ensures rigor, not hallucination.',
        icon: Zap,
    },
    {
        id: 'design',
        title: 'Design obsession',
        description: 'Every pixel serves a purpose. We believe software should be calm, cinematic, and intuitively beautiful.',
        icon: MonitorPlay,
    }
];

export const projects = [
    {
        id: 'jobbridge',
        title: 'JobBridge',
        shortDescription: 'Connecting talent with opportunity through verifiable skill matching.',
        fullDescription: 'JobBridge revolutionizes the hiring process by using AI to verify skills and match candidates with roles that actually fit. Reducing bias and increasing efficiency for both employers and job seekers.',
        targetAudience: 'Recruitment Agencies & Enterprises',
        trustFeatures: ['Verified Credentials', 'Bias-Free Matching', 'Data Sovereignty'],
        tags: ['Next.js', 'AI Matching', 'Platform'],
        status: 'Live',
        statusColor: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
        icon: Globe,
        links: [
            { label: 'Visit Platform', url: 'https://jobbridge.de', primary: true }, // Placeholder URL
            { label: 'Waitlist', url: '#', primary: false }
        ],
        highlight: true,
        imageSrc: '/projects/jobbridge.png', // Placeholder path
        imageAlt: 'JobBridge Dashboard Interface',
    },
    {
        id: 'rzn-services',
        title: 'RZN Services',
        shortDescription: 'German consulting excellence for high-stakes digital transformation.',
        fullDescription: 'Premier digital consulting services focusing on modernizing legacy systems and implementing cutting-edge web technologies for German SMEs and enterprises.',
        targetAudience: 'SMEs & Enterprises',
        trustFeatures: ['ISO Certified Processes', 'German Legal Compliance', 'Enterprise Support'],
        tags: ['Consulting', 'Digital Transformation', 'Enterprise'],
        status: 'Active',
        statusColor: 'border-blue-500/50 text-blue-400 bg-blue-500/10',
        icon: Cpu,
        links: [
            { label: 'Services Overview', url: '#', primary: true }
        ],
        highlight: false,
        imageSrc: '/projects/rzn.png',
        imageAlt: 'RZN Services Logo & Concept',
    },
    {
        id: 'ray-media',
        title: 'Ray Media',
        shortDescription: 'Next-generation media consumption/publishing platform.',
        fullDescription: 'A private platform reimagining how digital media is consumed and monetized, focusing on creator ownership and high-fidelity content delivery.',
        targetAudience: 'Content Creators & Publishers',
        trustFeatures: ['Content Authenticity', 'Direct Ownership', 'Zero-Tracking Ads'],
        tags: ['Media', 'Streaming', 'Private Beta'],
        status: 'In Planning',
        statusColor: 'border-purple-500/50 text-purple-400 bg-purple-500/10',
        icon: Smartphone,
        links: [],
        highlight: false,
        imageSrc: '/projects/media.png',
        imageAlt: 'Ray Media Platform Interface',
    },
    {
        id: 'ai-product',
        title: 'Flux / AI Council',
        shortDescription: 'Multi-model debate and synthesis engine.',
        fullDescription: 'An advanced AI interface that orchestrates debates between multiple LLMs to reach higher-accuracy conclusions. Features a "Chairman" model that synthesizes results.',
        targetAudience: 'Researchers & Analysts',
        trustFeatures: ['Hallucination Check', 'Transparent Reasoning', 'Source Citations'],
        tags: ['AI', 'LLM', 'Research Tool'],
        status: 'Private Beta',
        statusColor: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
        icon: BrainCircuit,
        links: [
            { label: 'Request Access', url: '/contact?topic=beta', primary: true }
        ],
        highlight: true,
        imageSrc: '/projects/flux.png',
        imageAlt: 'Flux AI Council Interface',
    }
];
