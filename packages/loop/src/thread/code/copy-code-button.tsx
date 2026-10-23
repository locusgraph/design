import { Button } from "@locusgraph/components";
import { Check as CheckIcon, Copy as CopyIcon } from "@phosphor-icons/react/ssr";
import { useCopied, writeToClipboard } from "../use-copied";

type CopyCodeButtonProps = {
  code: string;
  onCopy?: (code: string) => void;
};

export function CopyCodeButton({ code, onCopy }: CopyCodeButtonProps) {
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
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={copied ? "Copied" : "Copy code"}
      className="text-muted-foreground hover:text-foreground"
      onClick={copy}
    >
      {copied ? (
        <CheckIcon weight="bold" aria-hidden className="text-good" />
      ) : (
        <CopyIcon weight="bold" aria-hidden />
      )}
    </Button>
  );
}
