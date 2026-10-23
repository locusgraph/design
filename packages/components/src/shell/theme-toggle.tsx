"use client";

import { Moon as MoonIcon, Sun as SunIcon } from "@phosphor-icons/react/ssr";
import { Button } from "../action/button";

type Theme = "light" | "dark";

type ThemeToggleProps = { theme: Theme; onThemeChange: (theme: Theme) => void };

function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={() => onThemeChange(nextTheme)}
    >
      <SunIcon
        weight="bold"
        aria-hidden
        className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <MoonIcon
        weight="bold"
        aria-hidden
        className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
    </Button>
  );
}

export { ThemeToggle };
