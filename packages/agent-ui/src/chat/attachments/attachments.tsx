import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  cn,
} from "@locusgraph/components";
import {
  FileCodeIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  type LucideIcon,
  XIcon,
} from "lucide-react";
import type * as React from "react";
import {
  type AttachmentItem,
  fileExtensionLabel,
  formatBytes,
  isImageAttachment,
} from "./file-meta";

export type AttachmentsLayout = "inline" | "grid";

export type AttachmentsProps = Omit<React.ComponentProps<"ul">, "children"> & {
  items: AttachmentItem[];
  layout?: AttachmentsLayout;
  onRemove?: (id: string) => void;
};

const iconsByMediaType: [RegExp, LucideIcon][] = [
  [/csv|spreadsheet|excel/, FileSpreadsheetIcon],
  [/json|javascript|typescript|xml|x-python/, FileCodeIcon],
  [/text|pdf|markdown|word/, FileTextIcon],
];

function iconForMediaType(mediaType: string | undefined): LucideIcon {
  const match = iconsByMediaType.find(([pattern]) => mediaType && pattern.test(mediaType));
  return match ? match[1] : FileIcon;
}

function describeAttachment(item: AttachmentItem): string | undefined {
  const parts = [
    fileExtensionLabel(item),
    item.sizeBytes === undefined ? undefined : formatBytes(item.sizeBytes),
  ];
  const description = parts.filter(Boolean).join(" · ");
  return description || undefined;
}

function AttachmentPreview({ item }: { item: AttachmentItem }) {
  if (isImageAttachment(item)) {
    return (
      <AttachmentMedia variant="image">
        <img src={item.url} alt="" loading="lazy" />
      </AttachmentMedia>
    );
  }
  const Icon = iconForMediaType(item.mediaType);
  return (
    <AttachmentMedia>
      <Icon aria-hidden="true" />
    </AttachmentMedia>
  );
}

export function Attachments({
  items,
  layout = "inline",
  onRemove,
  className,
  ...props
}: AttachmentsProps) {
  if (items.length === 0) {
    return null;
  }
  const isGrid = layout === "grid";
  return (
    <ul
      data-slot="attachments"
      data-layout={layout}
      aria-label="Attachments"
      className={cn(
        isGrid ? "grid grid-cols-2 gap-2 sm:grid-cols-3" : "flex flex-wrap gap-2",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const description = describeAttachment(item);
        return (
          <li key={item.id} data-slot="attachments-item" className="min-w-0">
            <Attachment
              size="sm"
              orientation={isGrid ? "vertical" : "horizontal"}
              className={cn(isGrid && "w-full has-data-[slot=attachment-content]:w-full")}
            >
              <AttachmentPreview item={item} />
              <AttachmentContent>
                <AttachmentTitle title={item.name}>{item.name}</AttachmentTitle>
                {description && <AttachmentDescription>{description}</AttachmentDescription>}
              </AttachmentContent>
              {onRemove && (
                <AttachmentActions>
                  <AttachmentAction
                    aria-label={`Remove ${item.name}`}
                    onClick={() => onRemove(item.id)}
                  >
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              )}
            </Attachment>
          </li>
        );
      })}
    </ul>
  );
}
