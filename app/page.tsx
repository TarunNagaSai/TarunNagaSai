import { Hero } from '@/components/home/Hero';
import { AboutSnippet } from '@/components/home/AboutSnippet';
import { SelectedWork } from '@/components/home/SelectedWork';
import { FeaturedWriting } from '@/components/home/FeaturedWriting';
import { Testimonials } from '@/components/home/Testimonials';
import { ContactStrip } from '@/components/home/ContactStrip';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <SelectedWork />
      <FeaturedWriting />
      <Testimonials />
      <ContactStrip />
    </>
  );
}
