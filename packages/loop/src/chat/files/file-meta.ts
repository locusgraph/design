import type { FilePart } from "../../types";

export type FileItem = {
  id: string;
  name: string;
  mediaType?: string;
  url?: string;
  sizeBytes?: number;
};

const byteUnits = ["B", "KB", "MB", "GB"] as const;

export function formatBytes(bytes: number): string {
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < byteUnits.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const rounded = unitIndex === 0 || value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${byteUnits[unitIndex]}`;
}

export function isImageFile(item: FileItem): boolean {
  return Boolean(item.url && item.mediaType?.startsWith("image/"));
}

export function fileExtensionLabel(item: FileItem): string | undefined {
  const extension = item.name.includes(".") ? item.name.split(".").at(-1) : undefined;
  return extension ? extension.toUpperCase() : undefined;
}

export function filenameFromUrl(url: string): string {
  const lastSegment = url.split(/[?#]/)[0]?.split("/").at(-1);
  return lastSegment && !url.startsWith("data:") ? decodeURIComponent(lastSegment) : "Attachment";
}

export function fileFromFilePart(part: FilePart, index: number): FileItem {
  return {
    id: `${index}:${part.url.slice(0, 64)}`,
    name: part.filename ?? filenameFromUrl(part.url),
    mediaType: part.mediaType,
    url: part.url,
  };
}
