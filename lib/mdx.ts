import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects');
const RESEARCH_DIR = path.join(process.cwd(), 'content', 'research');

/** Average adult reading speed for prose, in words per minute. */
const WORDS_PER_MINUTE = 200;

/**
 * Estimated read time (in whole minutes) for a research article, computed from
 * its raw MDX at build time. Strips JSX/HTML tags, code, and markdown symbols so
 * only readable prose is counted. Returns null when the body file is absent.
 */
export async function getResearchReadingMinutes(
  slug: string,
  topicSlug: string,
): Promise<number | null> {
  const filePath = path.join(RESEARCH_DIR, slug, `${topicSlug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const text = raw
      .replace(/`{1,3}[^`]*`{1,3}/g, ' ') // inline + fenced code
      .replace(/<[^>]+>/g, ' ') // JSX / HTML tags
      .replace(/[#>*_\-!\[\]()]/g, ' '); // markdown punctuation
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  } catch {
    return null;
  }
}

export interface CaseStudyFrontmatter {
  title?: string;
  summary?: string;
}

export async function loadCaseStudy(slug: string): Promise<{
  frontmatter: CaseStudyFrontmatter;
  body: string;
} | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    return { frontmatter: data as CaseStudyFrontmatter, body: content };
  } catch {
    return null;
  }
}

export async function listCaseStudySlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}
