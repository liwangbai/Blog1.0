import Link from 'next/link';

interface CardProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ href, children, className = '' }: CardProps) {
  const base =
    'block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 transition-colors';

  if (href) {
    return (
      <Link
        href={href}
        className={`${base} hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm ${className}`}
      >
        {children}
      </Link>
    );
  }

  return <div className={`${base} ${className}`}>{children}</div>;
}
