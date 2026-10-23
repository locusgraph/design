import { cn } from "@locusgraph/components";
import type { Icon as IconType } from "@phosphor-icons/react";
import {
  FileCode as FileCodeIcon,
  File as FileIcon,
  Table as FileSpreadsheetIcon,
  FileText as FileTextIcon,
  X as XIcon,
} from "@phosphor-icons/react/ssr";
import type * as React from "react";
import { type FileItem, fileExtensionLabel, formatBytes, isImageFile } from "./file-meta";

export type FilesLayout = "inline" | "grid";

export type FilesProps = Omit<React.ComponentProps<"ul">, "children"> & {
  items: FileItem[];
  layout?: FilesLayout;
  onRemove?: (id: string) => void;
};

type ChipProps = {
  item: FileItem;
  isGrid: boolean;
  onRemove?: (id: string) => void;
};

const iconsByMediaType: [RegExp, IconType][] = [
  [/csv|spreadsheet|excel/, FileSpreadsheetIcon],
  [/json|javascript|typescript|xml|x-python/, FileCodeIcon],
  [/text|pdf|markdown|word/, FileTextIcon],
];

function iconForMediaType(mediaType: string | undefined): IconType {
  const match = iconsByMediaType.find(([pattern]) => mediaType && pattern.test(mediaType));
  return match ? match[1] : FileIcon;
}

function describeFile(item: FileItem): string | undefined {
  const parts = [
    fileExtensionLabel(item),
    item.sizeBytes === undefined ? undefined : formatBytes(item.sizeBytes),
  ];
  const description = parts.filter(Boolean).join(" · ");
  return description || undefined;
}

function FilePreview({ item, isGrid }: Omit<ChipProps, "onRemove">) {
  const Icon = iconForMediaType(item.mediaType);
  return (
    <span
      data-slot="files-preview"
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden bg-muted text-faint",
        isGrid ? "aspect-[16/10] w-full" : "size-9"
      )}
    >
      {isImageFile(item) ? (
        <img src={item.url} alt="" loading="lazy" className="size-full object-cover" />
      ) : (
        <Icon weight="bold" aria-hidden="true" className={isGrid ? "size-6" : "size-4"} />
      )}
    </span>
  );
}

function RemoveButton({ item, isGrid, onRemove }: Required<ChipProps>) {
  return (
    <button
      type="button"
      aria-label={`Remove ${item.name}`}
      onClick={() => onRemove(item.id)}
      className={cn(
        "grid size-6 shrink-0 place-items-center text-faint opacity-0 outline-none transition-[color,opacity] group-hover/file:opacity-100 hover:text-interactive focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring/70 [@media(hover:none)]:opacity-100 motion-reduce:transition-none",
        isGrid && "absolute top-1 right-1 bg-background/80"
      )}
    >
      <XIcon weight="bold" aria-hidden="true" className="size-3.5" />
    </button>
  );
}

function FileChip({ item, isGrid, onRemove }: ChipProps) {
  const description = describeFile(item);
  return (
    <li
      data-slot="files-item"
      className={cn(
        "group/file relative flex min-w-0 bg-muted/50 text-foreground",
        isGrid ? "flex-col" : "max-w-60 items-center gap-2.5 py-1.5 pr-1.5 pl-1.5",
        !isGrid && !onRemove && "pr-3"
      )}
    >
      <FilePreview item={item} isGrid={isGrid} />
      <span className={cn("flex min-w-0 flex-1 flex-col gap-0.5", isGrid && "px-3 py-2.5")}>
        <span title={item.name} className="truncate text-sm leading-tight font-medium">
          {item.name}
        </span>
        {description && (
          <span className="truncate text-xs leading-tight text-faint tabular-nums">
            {description}
          </span>
        )}
      </span>
      {onRemove && <RemoveButton item={item} isGrid={isGrid} onRemove={onRemove} />}
    </li>
  );
}

export function Files({ items, layout = "inline", onRemove, className, ...props }: FilesProps) {
  if (items.length === 0) {
    return null;
  }
  const isGrid = layout === "grid";
  return (
    <ul
      data-slot="files"
      data-layout={layout}
      aria-label="Files"
      className={cn(
        isGrid ? "grid grid-cols-2 gap-2 sm:grid-cols-3" : "flex flex-wrap gap-2",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <FileChip key={item.id} item={item} isGrid={isGrid} onRemove={onRemove} />
      ))}
    </ul>
  );
}
