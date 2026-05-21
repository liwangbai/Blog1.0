import Link from 'next/link';

interface TagProps {
  label: string;
  href?: string;
}

export function Tag({ label, href }: TagProps) {
  const base =
    'inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';

  if (href) {
    return (
      <Link href={href} className={`${base} hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}>
        {label}
      </Link>
    );
  }

  return <span className={base}>{label}</span>;
}
