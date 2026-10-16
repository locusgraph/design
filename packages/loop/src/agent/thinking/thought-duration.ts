export function thoughtDurationLabel(durationMs: number | undefined) {
  if (durationMs === undefined) return "Thought for a few seconds";
  const totalSeconds = Math.max(1, Math.round(durationMs / 1000));
  if (totalSeconds < 60) return `Thought for ${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return seconds === 0 ? `Thought for ${minutes}m` : `Thought for ${minutes}m ${seconds}s`;
}

export function firstLineOf(text: string) {
  return text.trim().split("\n")[0]?.trim() ?? "";
}
