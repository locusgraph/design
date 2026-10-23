import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@locusgraph/components";
import { formatDate } from "@locusgraph/utils";
import { CaretDown as ChevronDownIcon } from "@phosphor-icons/react/ssr";

export type CanvasVersion = { id: string; label: string; createdAt: string };

type VersionSwitcherProps = {
  versions: CanvasVersion[];
  current: CanvasVersion;
  onVersionChange?: (id: string) => void;
};

export const metaLinkClass =
  "inline-flex items-center gap-1 outline-none transition-colors duration-150 hover:text-interactive focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none";

function VersionLabel({ versions, current }: Omit<VersionSwitcherProps, "onVersionChange">) {
  return (
    <span className="tabular-nums">
      <span data-slot="canvas-current-version">{current.label}</span>
      {versions.length > 1 && ` of ${versions.length}`}
      {" · "}
      <time dateTime={current.createdAt}>{formatDate(current.createdAt)}</time>
    </span>
  );
}

export function VersionSwitcher({ versions, current, onVersionChange }: VersionSwitcherProps) {
  if (versions.length < 2 || !onVersionChange) {
    return <VersionLabel versions={versions} current={current} />;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={metaLinkClass}
        aria-label={`Version ${current.label}, choose another version`}
      >
        <VersionLabel versions={versions} current={current} />
        <ChevronDownIcon weight="bold" aria-hidden className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={6}>
        <DropdownMenuRadioGroup value={current.id} onValueChange={onVersionChange}>
          {versions.map((version) => (
            <DropdownMenuRadioItem key={version.id} value={version.id}>
              <span className="text-sm tabular-nums">{version.label}</span>
              <span className="ml-auto pl-4 text-xs text-muted-foreground tabular-nums">
                {formatDate(version.createdAt)}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
