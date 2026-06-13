import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Tarun NagaSai — Agentic AI Engineer & full-stack developer',
    template: '%s — Tarun NagaSai',
  },
  description:
    'I build LLM inference pipelines and the products people use to talk to them. Flutter, vLLM, NestJS, Laravel. Based in Vishakhapatnam, India.',
  keywords: [
    'Tarun NagaSai',
    'AI engineer',
    'LLM pipeline',
    'Flutter developer',
    'full-stack developer',
    'vLLM',
    'freelance',
  ],
  authors: [{ name: 'Tarun NagaSai' }],
  creator: 'Tarun NagaSai',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    title: 'Tarun NagaSai — Agentic AI Engineer & full-stack developer',
    description:
      'I build LLM inference pipelines and the products people use to talk to them.',
    siteName: 'Tarun NagaSai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarun NagaSai',
    description:
      'Agentic AI Engineer & full-stack developer. Flutter, vLLM, end-to-end product builds.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
