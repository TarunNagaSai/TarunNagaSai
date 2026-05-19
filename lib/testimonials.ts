/**
 * Testimonials shown on the home page carousel.
 * NOTE: these are placeholders — replace with real client/peer quotes
 * before going public. Keep each quote ~25–55 words; longer ones break
 * the visual rhythm of the section.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Tarun delivered what we needed, He understood out requirements and executed it perfectly. He automated most of our manual processes. Overall it was great working with him.",
    name: 'Yahuah Bible Platform',
    role: 'Founder · Yeral Ogando',
  },
  {
    quote:
      "Honestly, I'm so happy with how everything turned out. The final product looks amazing, and he actually did more than I even asked for. A huge shoutout for the UI betterments too, really appreciated that extra work done by him. At the end of the day, quality matters, and he nailed it!",
    name: 'Horeb References Bible App',
    role: 'Founder· Ajay Kumar Bunga',
  },
];
