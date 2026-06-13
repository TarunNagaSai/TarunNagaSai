/**
 * Services offered — rendered on /services and referenced from the
 * home-page snippet. Outcome-focused copy; tool names stay out of here
 * on purpose (the work itself is the proof, see /work).
 */

export interface Service {
  title: string;
  tagline: string;
  description: string;
  outcomes: string[];
  skillAnchor: string;
}

export const services: Service[] = [
  {
    title: 'AI & LLM Engineering',
    tagline: 'AI systems thats scales',
    description:
      'Custom model pipelines, fine-tuned models, quality evaluation, RAG systems and dedicated prompting technique. Built to run reliably in production by handling all the edge cases at a predictable cost. From the first data pass to the moment results reach your users, the whole pipeline is engineered, measured, monitored and owned.',
    outcomes: [
      'Predictable GPU spend',
      'Multi Instance GPU setup',
      'Models tuned to your domain',
      'Traffic based resource usage',
    ],
    skillAnchor: 'ai-llm',
  },
  {
    title: 'Mobile App Development',
    tagline: 'From architecture to the app store.',
    description:
      'Built on MVVC architecture that stays maintainable as the product grows. State managements that matches your use cases. End-to-end mobile apps for iOS and Android from a single codebase with offline-first and fast',
    outcomes: [
      'Monitor production apps',
      'Mobile CI/CD Integrations',
      'UI with smooth animations',
      'iOS and Android app deployments',
    ],
    skillAnchor: 'mobile',
  },
  {
    title: 'Full-Stack Web Development',
    tagline: 'Websites and web apps that feel intentional.',
    description:
      'Websites that feels lite and responsive, designed on a reuseable components and support small screens, fast on every device. Web app and PWA that feels native with different browser support',
    outcomes: [
      'Staged Rollout updates',
      'Multi-Legalistic support',
      'Responsive UI Design-system',
      'Installable, offline-capable PWAs',
    ],
    skillAnchor: 'frontend',
  },
  {
    title: 'Backend & Data Engineering',
    tagline: 'Systems that keep working unattended.',
    description:
      'Works with module, controller, server based architecture that can scales without dependencies. Authenticated apis calls with proper guards and middlewares, setup microservices that communicate seamlessly and get hands on servers that streams continues data through secured protocols.',
    outcomes: [
      'Clean, documented APIs',
      'Multi database support',
      'Serverless for best use cases',
      'MCP servers for AI to communicate',
    ],
    skillAnchor: 'backend',
  },
  {
    title: 'Deployments',
    tagline: 'From working build to live product.',
    description:
      'Works on servers that matches the users traffic which ships through SSH. Makes your servers work independently through containerized deployments and the release pipelines that make shipping routine instead of an event. Reviewed, automated, and repeatable.',
    outcomes: [
      'Traffic monitoring',
      'Automated release pipelines',
      'Servers that can roll back anytime',
      'Multi staged (dev, test, production) deployments',
    ],
    skillAnchor: 'deployments',
  },
];
