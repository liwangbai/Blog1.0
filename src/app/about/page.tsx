import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { Tag } from '@/components/ui/tag';
import { PageHeader } from '@/components/ui/page-header';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${SITE.author} — background, skills, and how to get in touch.`,
};

const SKILLS = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Go',
  'Rust',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'AWS',
  'GraphQL',
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader
        title="About Me"
        description="A bit about my background and what I do."
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Background
          </h2>
          <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              I&apos;m a full-stack developer with a passion for building
              well-architected software. I care deeply about developer
              experience, performance optimization, and writing clean,
              maintainable code.
            </p>
            <p>
              My journey in software started with curiosity about how websites
              work, which led me down the path from frontend to backend, from
              JavaScript to TypeScript, Rust, and Go. I enjoy working across
              the entire stack — from designing database schemas to crafting
              responsive user interfaces.
            </p>
            <p>
              When I&apos;m not coding, you can find me reading about systems
              design, contributing to open-source projects, or writing about
              what I&apos;ve learned on this blog.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Skills
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Contact
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Feel free to reach out via{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white underline hover:no-underline"
            >
              GitHub
            </a>
            {' '}or{' '}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white underline hover:no-underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
