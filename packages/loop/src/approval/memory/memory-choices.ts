import type { MemoryReviewResult, ProposedMemory } from "../types";

export type MemoryChoice = "keep" | "edit" | "discard";

export type MemoryDraft = { choice: MemoryChoice; text: string };

export function initialDrafts(memories: ProposedMemory[]): Record<string, MemoryDraft> {
  return Object.fromEntries(
    memories.map((memory) => [
      memory.id,
      { choice: memory.sensitive ? "discard" : "keep", text: memory.text },
    ])
  );
}

export function reviewResult(
  memories: ProposedMemory[],
  drafts: Record<string, MemoryDraft>
): MemoryReviewResult {
  const result: MemoryReviewResult = { kept: [], edited: [], discarded: [] };
  for (const memory of memories) {
    const draft = drafts[memory.id] ?? { choice: "keep", text: memory.text };
    const text = draft.text.trim();
    if (draft.choice === "discard") result.discarded.push(memory);
    else if (draft.choice === "edit" && text !== "" && text !== memory.text) {
      result.edited.push({ ...memory, text });
    } else result.kept.push(memory);
  }
  return result;
}

export function hasBlankEdit(drafts: Record<string, MemoryDraft>) {
  return Object.values(drafts).some((draft) => draft.choice === "edit" && draft.text.trim() === "");
}

export function submitLabel(result: MemoryReviewResult) {
  const saved = result.kept.length + result.edited.length;
  if (saved === 0) return "Discard all";
  return `Save ${saved} ${saved === 1 ? "memory" : "memories"}`;
}
