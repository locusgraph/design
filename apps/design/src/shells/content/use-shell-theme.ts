import { useState } from "react";

type Theme = "light" | "dark";

function documentTheme(): Theme {
  return typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export function useShellTheme() {
  const [theme, setTheme] = useState<Theme>(documentTheme);
  const changeTheme = (next: Theme) => {
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    setTheme(next);
  };
  return [theme, changeTheme] as const;
}
