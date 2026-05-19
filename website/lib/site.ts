/**
 * Single source of truth for all personal links, emails, and site URLs.
 * Update values here and they propagate everywhere on the site.
 */

export const SITE = {
  name: 'Tarun NagaSai',
  url: 'https://tarunnagasai.dev',
  email: 'tarunnagasai@icloud.com',

  social: {
    github: 'https://github.com/TarunNagaSai',
    linkedin: 'https://www.linkedin.com/in/tarun-naga-sai/',
    medium: 'https://medium.com/@tarunnagasai007',
    substack: 'https://substack.com/@tarunnagasai',
  },

  /** Display strings without protocols — used in contact lists. */
  display: {
    email: 'tarunnagasai@icloud.com',
    domain: 'tarunnagasai.dev',
    github: 'github.com/TarunNagaSai',
    linkedin: 'linkedin.com/in/tarun-naga-sai',
    medium: 'medium.com/@tarunnagasai007',
    substack: 'substack.com/@tarunnagasai',
  },

  /** Specific external URLs referenced from project / article data. */
  external: {
    flutterAnimationsRepo: 'https://github.com/TarunNagaSai/Flutter-Animations',
    genUiArticle: 'https://medium.com/p/ab26f4c177ff',
  },
} as const;

export const mailto = `mailto:${SITE.email}`;
