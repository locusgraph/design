import { cn } from "@locusgraph/components";

export type LoaderProps = {
  variant?: "dots" | "shimmer";
  label?: string;
  className?: string;
};

const dotDelays = ["[animation-delay:-0.3s]", "[animation-delay:-0.15s]", ""];

function TypingDots() {
  return (
    <span aria-hidden className="flex items-center gap-1">
      {dotDelays.map((delay) => (
        <span
          key={delay || "last"}
          className={cn(
            "size-1.5 rounded-full bg-muted-foreground motion-safe:animate-bounce",
            delay
          )}
        />
      ))}
    </span>
  );
}

export function Loader({ variant = "dots", label = "Thinking…", className }: LoaderProps) {
  return (
    <span
      data-slot="loader"
      data-variant={variant}
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center text-sm text-muted-foreground", className)}
    >
      {variant === "dots" ? (
        <>
          <TypingDots />
          <span className="sr-only">{label}</span>
        </>
      ) : (
        <span className="font-mono text-[11.5px] motion-safe:shimmer">{label}</span>
      )}
    </span>
  );
}
