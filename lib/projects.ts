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
    slug: 'yahuah-bible-platform',
    number: '01',
    title: 'Yahuah Bible Platform',
    tagline: 'An AI translation system for sacred text.',
    year: '03/2026',
    status: 'Active',
    blurb:
      'Built a custom AI pipeline that translates the Bible into European languages without losing the meaning of Hebrew or Greek words. Runs on GPU servers and shipped 60,000+ verses with zero errors.',
    tags: ['Bible Studies', 'Multi-Legalistic', 'AI', 'Mobile', 'Website'],
    featured: true,
    links: [],
  },
  {
    slug: 'horeb',
    number: '02',
    title: 'Horeb',
    tagline: 'Offline-first Bible app for Flutter.',
    year: '04/2026',
    status: 'Production',
    blurb:
      'Rebuilt a state-heavy Flutter app to be data-driven and offline-first. Cut memory use by 64% and made the app 3x faster — without changing what users see.',
    tags: ['Bible Studies', 'Multi-Legalistic', 'AI', 'Mobile',],
    featured: true,
    links: [{
      "label": "Play Store",
      "href":"https://play.google.com/store/apps/details?id=bible.telugu.horeb"
    },
    {
      "label": "App Store",
      "href":"https://apps.apple.com/in/app/horeb-reference-bible/id6761109821"
    }
  ],
  },
  {
    slug: 'bumpedin',
    number: '04',
    title: 'BumpedIn',
    tagline: 'Discover people near you.',
    year: '07/2024',
    status: 'Production',
    blurb:
      'A social app that shows you people in your community within a chosen radius — with real-time chat over sockets and background location tracking.',
    tags: ['Social Media', 'Communication', 'Geolocation','Mobile'],
    featured: true,
  },
  {
    slug: 'healthpass',
    number: '03',
    title: 'HealthPass by TruNord',
    tagline: 'Health & fitness app on the App Store.',
    year: '04/2024',
    status: 'Production',
    blurb:
      'Built the full Flutter app and bridged it to native Android + iOS health SDKs. Tracks steps, sleep, nutrition, and connects users to doctors via video call.',
    tags: ['Medical', 'Health','Insurance', 'Mobile'],
    featured: true,
  },
  {
    slug: 'pokedex-ai',
    number: '05',
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
    number: '06',
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
