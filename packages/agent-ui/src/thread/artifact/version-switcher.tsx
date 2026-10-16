import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@locusgraph/components";
import { formatDate } from "@locusgraph/utils";
import { ChevronDownIcon } from "lucide-react";

export type ArtifactVersion = { id: string; label: string; createdAt: string };

type VersionSwitcherProps = {
  versions: ArtifactVersion[];
  current: ArtifactVersion;
  onVersionChange?: (id: string) => void;
};

export function VersionSwitcher({ versions, current, onVersionChange }: VersionSwitcherProps) {
  const label = (
    <span className="flex items-center gap-1.5 font-mono text-[11.5px]">
      <span data-slot="artifact-current-version">{current.label}</span>
      <time dateTime={current.createdAt} className="text-muted-foreground">
        {formatDate(current.createdAt)}
      </time>
    </span>
  );
  if (versions.length < 2 || !onVersionChange) {
    return label;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="xs"
          aria-label={`Version ${current.label}, choose another version`}
        >
          {label}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={current.id} onValueChange={onVersionChange}>
          {versions.map((version) => (
            <DropdownMenuRadioItem key={version.id} value={version.id}>
              <span className="font-mono text-[11.5px]">{version.label}</span>
              <span className="ml-auto pl-4 text-xs text-muted-foreground">
                {formatDate(version.createdAt)}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
