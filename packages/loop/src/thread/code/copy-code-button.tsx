import { Checkmark as CheckIcon, Copy as CopyIcon } from "@carbon/icons-react";
import { Button } from "@locusgraph/components";
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
      {copied ? <CheckIcon className="text-good" /> : <CopyIcon />}
    </Button>
  );
}
