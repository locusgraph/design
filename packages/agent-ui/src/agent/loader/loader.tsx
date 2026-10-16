import { cn } from "@locusgraph/components";

export type LoaderProps = {
  variant?: "dots" | "shimmer";
  label?: string;
  className?: string;
};

const dotDelays = ["[animation-delay:0ms]", "[animation-delay:200ms]", "[animation-delay:400ms]"];

function TypingDots() {
  return (
    <span aria-hidden className="flex h-5 items-center gap-1">
      {dotDelays.map((delay) => (
        <span
          key={delay}
          className={cn(
            "size-1.5 rounded-full bg-muted-foreground/70 motion-safe:animate-pulse",
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
        <span className="motion-safe:shimmer">{label}</span>
      )}
    </span>
  );
}
