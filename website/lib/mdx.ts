import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects');

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
