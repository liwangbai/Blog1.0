interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}
