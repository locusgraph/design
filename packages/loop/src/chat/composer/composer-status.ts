export type ComposerStatus = "ready" | "submitting" | "streaming" | "error";

export function isComposerBusy(status: ComposerStatus): boolean {
  return status === "submitting" || status === "streaming";
}
