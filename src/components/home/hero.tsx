export function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-20">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
        <span className="text-3xl font-bold text-gray-500 dark:text-gray-400">
          W
        </span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Hello, I&apos;m WPY
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
        A full-stack developer passionate about building great products with
        modern web technologies. I write about TypeScript, React, Rust, and
        system design.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/blog"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
        >
          Read Blog
        </a>
        <a
          href="/projects"
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          View Projects
        </a>
      </div>
    </section>
  );
}
