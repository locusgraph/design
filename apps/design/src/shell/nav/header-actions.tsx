import {
  Button,
  Separator,
  ThemeToggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@locusgraph/components";
import {
  Monitor as MonitorIcon,
  MagnifyingGlass as SearchIcon,
  DeviceMobile as SmartphoneIcon,
} from "@phosphor-icons/react/ssr";
import { type ShellSettings, setParam } from "../../url-state";

type HeaderActionsProps = { settings: ShellSettings; onSearch: () => void };

export function HeaderActions({ settings, onSearch }: HeaderActionsProps) {
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={onSearch}
        className="w-8 justify-start bg-surface font-normal text-muted-foreground shadow-none hover:bg-surface/80 sm:w-64"
      >
        <SearchIcon weight="bold" aria-hidden />
        <span className="hidden sm:inline">Search components…</span>
        <kbd className="ml-auto hidden border bg-background px-1.5 font-mono text-[11px] sm:inline">
          ⌘K
        </kbd>
      </Button>
      <Separator orientation="vertical" className="ml-2 hidden sm:block" />
      <ToggleGroup
        type="single"
        size="sm"
        value={settings.viewport}
        onValueChange={(viewport) =>
          viewport && setParam("viewport", viewport === "desktop" ? null : viewport)
        }
        className="hidden sm:flex"
      >
        <ToggleGroupItem value="desktop" aria-label="Desktop preview" className="size-8">
          <MonitorIcon weight="bold" aria-hidden />
        </ToggleGroupItem>
        <ToggleGroupItem value="mobile" aria-label="Mobile preview" className="size-8">
          <SmartphoneIcon weight="bold" aria-hidden />
        </ToggleGroupItem>
      </ToggleGroup>
      <Separator orientation="vertical" />
      <ThemeToggle
        theme={settings.theme}
        onThemeChange={(theme) => setParam("theme", theme === "light" ? null : theme)}
      />
    </>
  );
}
