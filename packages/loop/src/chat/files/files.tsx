import {
  type CarbonIconType as CarbonIcon,
  Code as FileCodeIcon,
  DocumentBlank as FileIcon,
  DataTable as FileSpreadsheetIcon,
  Document as FileTextIcon,
  Close as XIcon,
} from "@carbon/icons-react";
import { cn } from "@locusgraph/components";
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

const iconsByMediaType: [RegExp, CarbonIcon][] = [
  [/csv|spreadsheet|excel/, FileSpreadsheetIcon],
  [/json|javascript|typescript|xml|x-python/, FileCodeIcon],
  [/text|pdf|markdown|word/, FileTextIcon],
];

function iconForMediaType(mediaType: string | undefined): CarbonIcon {
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
        "grid shrink-0 place-items-center overflow-hidden bg-muted text-muted-foreground",
        isGrid ? "aspect-[16/10] w-full" : "size-10"
      )}
    >
      {isImageFile(item) ? (
        <img src={item.url} alt="" loading="lazy" className="size-full object-cover" />
      ) : (
        <Icon aria-hidden="true" className={isGrid ? "size-6" : "size-4"} />
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
        "grid size-6 shrink-0 place-items-center text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring",
        isGrid && "absolute top-1 right-1 bg-card/90"
      )}
    >
      <XIcon aria-hidden="true" className="size-3.5" />
    </button>
  );
}

function FileChip({ item, isGrid, onRemove }: ChipProps) {
  const description = describeFile(item);
  return (
    <li
      data-slot="files-item"
      className={cn(
        "relative flex min-w-0 bg-card text-card-foreground ring-1 ring-border",
        isGrid ? "flex-col" : "w-60 max-w-full items-center gap-2.5 pr-1",
        !isGrid && !onRemove && "pr-3"
      )}
    >
      <FilePreview item={item} isGrid={isGrid} />
      <span className={cn("flex min-w-0 flex-1 flex-col gap-0.5", isGrid && "px-2.5 py-2")}>
        <span title={item.name} className="truncate text-xs leading-tight font-medium">
          {item.name}
        </span>
        {description && (
          <span className="truncate font-mono text-xs leading-tight text-muted-foreground tabular-nums">
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
