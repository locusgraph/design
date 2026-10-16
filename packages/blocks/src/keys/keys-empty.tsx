import {
  Button,
  RuleGrid,
  RuleGridCell,
  RuleGridDescription,
  RuleGridTitle,
} from "@locusgraph/components";
import { KeyRoundIcon, PlusIcon } from "lucide-react";
import type { LinkComponent } from "../types";

type KeysEmptyProps = {
  newKeyHref?: string;
  description?: string;
  linkComponent?: LinkComponent | "a";
};

export function KeysEmpty({
  newKeyHref,
  description = newKeyHref
    ? "Create a key to let a service call LocusGraph products for this organization."
    : "Ask an owner to create a key for this organization.",
  linkComponent: Link = "a",
}: KeysEmptyProps) {
  return (
    <RuleGrid columns={1}>
      <RuleGridCell className="items-center gap-2 py-12 text-center">
        <KeyRoundIcon className="mb-1 size-5 text-muted-foreground" />
        <RuleGridTitle>No API keys yet</RuleGridTitle>
        <RuleGridDescription className="max-w-sm">{description}</RuleGridDescription>
        {newKeyHref && (
          <Button asChild size="sm" className="mt-2">
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
