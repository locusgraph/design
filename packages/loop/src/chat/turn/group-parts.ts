import type {
  DataPart,
  FilePart,
  MessagePart,
  ReasoningPart,
  SourceUrlPart,
  TextPart,
  ToolPart,
} from "../../types";

export type PartSegment =
  | { kind: "text"; key: string; part: TextPart }
  | { kind: "reasoning"; key: string; part: ReasoningPart }
  | { kind: "tool"; key: string; part: ToolPart }
  | { kind: "data"; key: string; part: DataPart }
  | { kind: "files"; key: string; parts: FilePart[] }
  | { kind: "sources"; key: string; parts: SourceUrlPart[]; firstIndex: number };

export function isToolPart(part: MessagePart): part is ToolPart {
  return part.type === "dynamic-tool" || part.type.startsWith("tool-");
}

export function isDataPart(part: MessagePart): part is DataPart {
  return part.type.startsWith("data-");
}

function appendToRun(
  segments: PartSegment[],
  kind: "files" | "sources",
  part: FilePart | SourceUrlPart,
  key: string,
  firstIndex = 1
) {
  const previous = segments.at(-1);
  if (previous?.kind === kind) {
    (previous.parts as (FilePart | SourceUrlPart)[]).push(part);
    return;
  }
  segments.push(
    kind === "files"
      ? { kind, key, parts: [part as FilePart] }
      : { kind, key, parts: [part as SourceUrlPart], firstIndex }
  );
}

export function groupParts(parts: MessagePart[]): PartSegment[] {
  const segments: PartSegment[] = [];
  let sourcesSeen = 0;
  parts.forEach((part, index) => {
    const key = `${part.type}:${index}`;
    if (part.type === "text") {
      segments.push({ kind: "text", key, part });
    } else if (part.type === "reasoning") {
      segments.push({ kind: "reasoning", key, part });
    } else if (part.type === "file") {
      appendToRun(segments, "files", part, key);
    } else if (part.type === "source-url") {
      sourcesSeen += 1;
      appendToRun(segments, "sources", part, key, sourcesSeen);
    } else if (isToolPart(part)) {
      segments.push({ kind: "tool", key: part.toolCallId, part });
    } else if (isDataPart(part)) {
      segments.push({ kind: "data", key: part.id ?? key, part });
    }
  });
  return segments;
}
