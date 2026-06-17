import type { ComponentProps } from 'react';

/**
 * MDX element overrides for the research series-root body. These mirror the
 * `.prose-custom` rules in globals.css, but as element components instead of a
 * descendant-selector wrapper — that way the inline <Topic /> cards keep their
 * own styling (and full width) instead of inheriting prose link/heading rules.
 *
 * Text blocks carry `max-w-prose` themselves so the reading column stays narrow
 * while cards can span the full container.
 */
export const researchProseComponents = {
  p: (props: ComponentProps<'p'>) => (
    <p className="mb-6 text-left max-w-prose" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="text-h2 font-medium mt-16 mb-4 text-fg max-w-prose" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="text-xl font-medium mt-12 mb-3 text-fg max-w-prose" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul
      className="mb-6 space-y-2 pl-5 list-disc marker:text-muted max-w-prose"
      {...props}
    />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol
      className="mb-6 space-y-2 pl-5 list-decimal marker:text-muted max-w-prose"
      {...props}
    />
  ),
  a: (props: ComponentProps<'a'>) => (
    <a
      className="text-fg underline decoration-border underline-offset-4 hover:decoration-accent transition-colors"
      {...props}
    />
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="text-fg font-medium" {...props} />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-2 border-border pl-6 my-8 text-subtle italic max-w-prose"
      {...props}
    />
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre
      className="font-mono text-sm bg-border/40 rounded-lg p-4 my-6 overflow-x-auto whitespace-pre-wrap break-words max-w-prose"
      {...props}
    />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code
      className="font-mono text-[0.875em] text-accent bg-border/40 px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  hr: (props: ComponentProps<'hr'>) => (
    <hr className="border-border my-12 max-w-prose" {...props} />
  ),
  // Markdown `![alt](/path 'caption')` — the optional title becomes a caption.
  img: ({ title, alt, ...props }: ComponentProps<'img'>) => (
    <figure className="my-8 max-w-prose">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        className="w-full h-auto rounded-lg border border-border"
        {...props}
      />
      {title ? (
        <figcaption className="mt-3 text-sm text-muted text-center">
          {title}
        </figcaption>
      ) : null}
    </figure>
  ),
};
