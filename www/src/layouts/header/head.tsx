interface HeaderHeadProps {
  title: string;
  subtitle?: string;
}

export function HeaderHead({ title, subtitle }: HeaderHeadProps) {
  return (
    <div className="min-w-0 flex-1 flex flex-col gap-1">
      <h1 className="truncate text-2xl font-bold text-foreground">{title}</h1>
      {subtitle && <p className="truncate text-sm text-primary-600">{subtitle}</p>}
    </div>
  );
}
