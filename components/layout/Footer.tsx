import Image from 'next/image';
import { Container } from './Container';
import { SITE } from '@/lib/site';
import GithubIcon from '@/assets/Github=White.svg';
import XIcon from '@/assets/X=White.svg';
import SubstackIcon from '@/assets/substack.svg';
import LinkedInIcon from '@/assets/Group.svg';
import MediumIcon from '@/assets/Dribbble=White.svg';
import HuggingFaceIcon from '@/assets/Huggingface.svg';

const SOCIALS = [
  { label: 'GitHub',   href: SITE.social.github,   icon: GithubIcon   },
  { label: 'Hugging Face', href: SITE.social.huggingFace, icon: HuggingFaceIcon },
  { label: 'LinkedIn', href: SITE.social.linkedin,  icon: LinkedInIcon },
  // { label: 'Substack', href: SITE.social.substack,  icon: SubstackIcon },
  { label: 'Medium',   href: SITE.social.medium,    icon: MediumIcon   },
  { label: 'X',        href: SITE.social.x,         icon: XIcon        },
].filter((s) => s.href);

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 pb-12 pt-12 border-t border-border">
      <Container size="wide">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-muted">
          <span>© {year} — Tarun Naga sai</span>
          <span className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="icon-accent-hover"
                aria-label={s.label}
              >
                <Image src={s.icon} alt={s.label} width={18} height={18} />
              </a>
            ))}
          </span>
        </div>
      </Container>
    </footer>
  );
}
