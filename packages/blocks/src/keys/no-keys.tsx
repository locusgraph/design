import {
  Button,
  RuleGrid,
  RuleGridCell,
  RuleGridDescription,
  RuleGridLabel,
} from "@locusgraph/components";
import { KeyRoundIcon, PlusIcon } from "lucide-react";
import type { LinkComponent } from "../types";

type NoKeysProps = {
  newKeyHref?: string;
  description?: string;
  linkComponent?: LinkComponent | "a";
};

export function NoKeys({
  newKeyHref,
  description = newKeyHref
    ? "Create a key to let a service call LocusGraph products for this organization."
    : "Ask an owner to create a key for this organization.",
  linkComponent: Link = "a",
}: NoKeysProps) {
  return (
    <RuleGrid columns={1}>
      <RuleGridCell className="items-center gap-3 py-12 text-center">
        <KeyRoundIcon className="size-5 text-muted-foreground" />
        <RuleGridLabel>No API keys yet</RuleGridLabel>
        <RuleGridDescription className="max-w-sm">{description}</RuleGridDescription>
        {newKeyHref && (
          <Button asChild size="sm">
            <Link href={newKeyHref}>
              <PlusIcon />
              New key
            </Link>
          </Button>
        )}
      </RuleGridCell>
    </RuleGrid>
  );
}
