# WPY's Blog

A personal blog and portfolio built with modern web technologies.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Content**: MDX with `next-mdx-remote`
- **Code Highlighting**: Shiki + rehype-pretty-code
- **Theme**: Dark mode via `next-themes`
- **Deployment**: Docker with standalone output

## Features

- Blog with MDX content, code highlighting, and reading time estimates
- Project portfolio
- RSS feed (`/feed.xml`)
- Auto-generated sitemap
- SEO metadata with Open Graph and Twitter cards
- Dark mode with system preference detection
- Responsive design
- Custom 404 and error pages
- Docker support with multi-stage builds

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── content/             # MDX content files
│   ├── posts/           # Blog posts
│   └── projects/        # Portfolio projects
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── blog/        # Blog routes
│   │   ├── projects/    # Project routes
│   │   ├── about/       # About page
│   │   ├── feed.xml/    # RSS feed
│   │   └── sitemap.ts   # Sitemap generation
│   ├── components/      # React components
│   │   ├── blog/        # Blog-specific components
│   │   ├── home/        # Home page sections
│   │   ├── layout/      # Header, footer, navigation
│   │   ├── projects/    # Project-specific components
│   │   └── ui/          # Reusable UI components
│   ├── lib/             # Utilities (MDX parsing, reading time)
│   └── types/           # TypeScript type definitions
├── Dockerfile           # Multi-stage Docker build
└── next.config.ts       # Next.js configuration
```

## Adding Content

### Blog Posts

Create an MDX file in `content/posts/` with frontmatter:

```mdx
---
title: "Your Post Title"
description: "A brief description"
date: "2026-01-15"
tags: ["nextjs", "typescript"]
featured: true
---

Your content here...
```

### Projects

Create an MDX file in `content/projects/` with frontmatter:

```mdx
---
title: "Project Name"
description: "Project description"
tags: ["react", "node"]
featured: true
github: "https://github.com/username/repo"
demo: "https://demo.example.com"
---

Project details...
```

## Docker

```bash
docker build -t blog .
docker run -p 3000:3000 blog
```

## License

MIT
