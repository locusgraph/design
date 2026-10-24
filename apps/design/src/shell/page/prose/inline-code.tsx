export function withInlineCode(text: string) {
  return text.split(/(`[^`]+`)/).map((part, index) =>
    part.startsWith("`") && part.endsWith("`") ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: the parts of one fixed string never reorder
      <code key={index} className="font-mono text-[0.9em] text-foreground">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    )
  );
}
