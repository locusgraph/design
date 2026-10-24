import { CircleNotch as Loader2Icon } from "@phosphor-icons/react/ssr";
import { cn } from "../../cn";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      weight="bold"
      role="status"
      aria-label="Loading"
      className={cn("size-4 motion-safe:animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
