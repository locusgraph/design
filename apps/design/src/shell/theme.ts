import { useEffect } from "react";
import type { Theme } from "../url-state";

export function useDocumentTheme(theme: Theme) {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
}
