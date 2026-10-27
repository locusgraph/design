import { darkColors, lightColors } from "@locusgraph/tokens";
import { useEffect } from "react";
import type { Theme } from "../url-state";

const browserBarColor: Record<Theme, string> = {
  dark: darkColors.background,
  light: lightColors.background,
};

function setBrowserBarColor(theme: Theme) {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", browserBarColor[theme]);
}

export function useDocumentTheme(theme: Theme) {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    setBrowserBarColor(theme);
  }, [theme]);
}
