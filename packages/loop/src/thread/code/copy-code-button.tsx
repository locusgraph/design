import { Button } from "@locusgraph/components";
import { Check as CheckIcon, Copy as CopyIcon } from "@phosphor-icons/react/ssr";
import { LiveStatus } from "../../shared/live-status";
import { useCopied, writeToClipboard } from "../use-copied";

type CopyCodeButtonProps = {
  code: string;
  onCopy?: (code: string) => void;
  size?: "icon-xs" | "icon-sm";
};

export function CopyCodeButton({ code, onCopy, size = "icon-xs" }: CopyCodeButtonProps) {
  const { copied, markCopied } = useCopied();
  const copy = async () => {
    if (onCopy) {
      onCopy(code);
      markCopied();
      return;
    }
    if (await writeToClipboard(code)) {
      markCopied();
    }
  };
  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size={size}
        aria-label={copied ? "Copied" : "Copy code"}
        className="text-faint hover:bg-transparent hover:text-interactive"
        onClick={copy}
      >
        {copied ? (
          <CheckIcon weight="bold" aria-hidden className="text-good" />
        ) : (
          <CopyIcon weight="bold" aria-hidden />
        )}
      </Button>
      <LiveStatus message={copied ? "Code copied" : ""} />
    </>
  );
}
