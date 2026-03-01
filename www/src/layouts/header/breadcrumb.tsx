import { cn } from "@locus/components";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface HeaderBreadcrumbProps {
  segments: BreadcrumbSegment[];
}

const linkClass =
  "truncate text-primary-500 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded";

interface BreadcrumbItemProps {
  segment: BreadcrumbSegment;
  index: number;
  isLast: boolean;
}

function BreadcrumbItem({ segment, index, isLast }: BreadcrumbItemProps) {
  const isLink = Boolean(segment.href && !isLast);

  return (
    <li className="flex items-center gap-1.5">
      {index > 0 && (
        <span className="text-primary-500" aria-hidden>
          /
        </span>
      )}
      {isLink ? (
        <a href={segment.href} className={linkClass}>
          {segment.label}
        </a>
      ) : (
        <span
          className={cn("truncate", isLast ? "font-medium text-foreground" : "text-primary-500")}
        >
          {segment.label}
        </span>
      )}
    </li>
  );
}

export function HeaderBreadcrumb({ segments }: HeaderBreadcrumbProps) {
  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs">
        {segments.map((segment, i) => (
          <BreadcrumbItem
            key={`${segment.label}-${i}`}
            segment={segment}
            index={i}
            isLast={i === segments.length - 1}
          />
        ))}
      </ol>
    </nav>
  );
}
