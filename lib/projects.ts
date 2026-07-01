import { Link } from 'lucide-react';
import { SITE } from './site';

export type ProjectStatus = 'Production' | 'Active' | 'Research' | 'OSS' | 'Archived';

export interface Project {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  year: string;
  status: ProjectStatus;
  blurb: string;
  tags: string[];
  featured: boolean;
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
    {
    slug: 'atlas',
    number: '01',
    title: 'Atlas',
    tagline: 'Agentic financial research platform over Gemini.',
    year: '07/2026',
    status: 'Active',
    blurb:
      'A full-stack RAG platform for financial document intelligence. Upload financial PDFs, index them into a pgvector store with hybrid search, then interrogate them through a streaming ReAct agent that plans, retrieves, and reasons — all visible live in the UI.',
    tags: ['Agentic', 'Gen AI', 'RAG','Gemini'],
    featured: true,
    links: [
      {
        "label": "website",
        "href":"https://atlas.avipra.com"
      },],
  },
  {
    slug: 'yahuah-bible-platform',
    number: '02',
    title: 'Yahuah Bible Platform',
    tagline: 'An AI translation system for sacred text.',
    year: '03/2026',
    status: 'Active',
    blurb:
      'Built a complete eco-system for the existing proprietary bible website. Boosted the platform with automated tools and finally built custom AI pipeline that translates the Bible into European languages without losing the meaning of Hebrew or Greek words.',
    tags: ['Bible Studies', 'Multi-Legalistic', 'AI'],
    featured: true,
    links: [
      {
        "label": "website",
        "href":"https://yahuahbible.com"
      },
      {
        "label":"Android",
        "href":"https://play.google.com/store/apps/details?id=com.yahuha.app"
      },
      {
        "label":"iOS/Mac",
        "href":"https://apps.apple.com/us/app/yahuah-bible/id6759186130"
      },
      {
        "label":"Windows",
        "href":"https://apps.microsoft.com/detail/9n8p3vx2xs5j?hl=en-gb&gl=IN"
      }
    ],
  },
  {
    slug: 'horeb',
    number: '03',
    title: 'Horeb',
    tagline: 'Offline-first Bible app for Flutter.',
    year: '04/2026',
    status: 'Production',
    blurb:
      'Built a enterprise bible app that been used by more than 10k+ users. This is a offline 1st application that even runs smoothly on low end device and implemented with accessability tools to enhance the reading experience to the user',
    tags: ['Bible Studies', 'Multi-Legalistic', 'AI'],
    featured: true,
    links: [{
      "label": "Android",
      "href":"https://play.google.com/store/apps/details?id=bible.telugu.horeb"
    },
    {
      "label": "iOS",
      "href":"https://apps.apple.com/in/app/horeb-reference-bible/id6761109821"
    }
  ],
  },
  {
    slug: 'healthpass',
    number: '04',
    title: 'HealthPass by TruNord',
    tagline: 'Health & fitness app on the App Store.',
    year: '04/2024',
    status: 'Production',
    blurb:
      'Built the full Flutter app and bridged it to native Android + iOS health SDKs. Tracks steps, sleep, nutrition, and connects users to doctors via video call.',
    tags: ['Medical', 'Health','Insurance', 'Mobile'],
    featured: true,
     links: [
      { label: 'Android', href:"https://play.google.com/store/apps/details?id=co.health.trunordd&hl=en_IN"},
      { label: 'iOS', href:"https://apps.apple.com/in/app/healthpass-by-trunord/id1564393271"},
    ],
  },
  {
    slug: 'bumpedin',
    number: '05',
    title: 'BumpedIn',
    tagline: 'Discover people near you.',
    year: '07/2024',
    status: 'Production',
    blurb:
      'A social app that shows you people in your community within a chosen radius — with real-time chat over sockets and background location tracking.',
    tags: ['Social Media', 'Communication', 'Geolocation','Mobile'],
    featured: true,
    links: [
      { label: 'Android', href:"https://play.google.com/store/apps/details?id=com.bumpedin.bumpedin&hl=en"},
      { label: 'iOS', href:"https://apps.apple.com/in/app/6476984578"},
    ],
  },
  {
    slug: 'pokedex-ai',
    number: '06',
    title: 'PokéDex AI',
    tagline: 'My first LLM project.',
    year: '06/2025',
    status: 'OSS',
    blurb:
      'A custom assistant trained on Pokémon data. Built two backends side-by-side — one with LangChain, one with ChromaDB — to learn how retrieval-augmented generation actually works.',
    tags: ['Gen AI', 'RAG','Gemini'],
     links: [
      { label: 'GitHub', href: SITE.external.flutterAnimationsRepo },
    ],
    featured: false,
  },
  {
    slug: 'flutter-animations',
    number: '07',
    title: 'Flutter Animations',
    tagline: 'Open-source animation patterns.',
    year: '12/2025',
    status: 'OSS',
    blurb:
      'A public reference repo of advanced Flutter animation patterns — physics scrolling, custom clip paths, gesture-driven cards, shared element transitions.',
    tags: ['Animation', 'Flutter', 'Dart', 'Lottie',],
    featured: false,
    links: [
      { label: 'GitHub', href: SITE.external.flutterAnimationsRepo },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
