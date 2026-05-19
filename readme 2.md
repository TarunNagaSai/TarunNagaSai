
  Run
  cd website
  npm run dev        # http://localhost:3000
  npm run build      # production

  Theme tokens live in website/tailwind.config.ts — swap accent: '#5BA3D0' to change the whole site's accent in one place.

  Add a project
  1. Append an entry to website/lib/projects.ts
  2. Create website/content/projects/<slug>.mdx with the body
  3. Done — case study page auto-generates at /work/<slug>

  Add an article — append to website/lib/articles.ts.

  Deploy — push to GitHub, import to Vercel, zero config. Update metadataBase in app/layout.tsx once you have a real domain.

  Have fun with it.