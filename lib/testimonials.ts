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
      "Tarun owned the AI pipeline end-to-end — from GPU orchestration to the admin tools we use to publish translations. The thing just works. We have not had to think about it once since launch.",
    name: 'Yahuah Bible Platform',
    role: 'Founder · AI Translation Pipeline',
  },
  {
    quote:
      "He rewrote the entire Flutter app while it was live in the store. Memory dropped, screens got snappier, and our crash rate went down — and users never noticed a thing. That is the highest compliment I can give.",
    name: 'Horeb',
    role: 'Product Lead · Mobile',
  },
  {
    quote:
      "Most engineers either build the app or the AI behind it. Tarun does both fluently, on the same project. It saved us a hire and the two halves actually talk to each other.",
    name: 'Independent Client',
    role: 'Founder · AI Product',
  },
  {
    quote:
      "Clean code, clean thinking, and the rare ability to explain why a decision was made — not just what was shipped. The kind of engineer you keep on speed dial.",
    name: 'Engineering Collaborator',
    role: 'Senior Engineer · Backend',
  },
];
