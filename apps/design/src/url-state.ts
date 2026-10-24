import { useMemo, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export type Viewport = "desktop" | "mobile";
export type PreviewBackground = "surface" | "plain" | "checker";
export type ShellSettings = { theme: Theme; viewport: Viewport; background: PreviewBackground };

const NAVIGATE_EVENT = "design:navigate";
const SHELL_PARAMS = ["theme", "viewport", "background"];

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

function currentHref() {
  return window.location.pathname + window.location.search;
}

function pickOne<Option extends string>(value: string | null, options: readonly Option[]) {
  return options.find((option) => option === value) ?? (options[0] as Option);
}

export function readShellSettings(params: URLSearchParams): ShellSettings {
  return {
    theme: pickOne(params.get("theme"), ["light", "dark"]),
    viewport: pickOne(params.get("viewport"), ["desktop", "mobile"]),
    background: pickOne(params.get("background"), ["surface", "plain", "checker"]),
  };
}

export function useLocation() {
  const href = useSyncExternalStore(subscribe, currentHref);
  return useMemo(() => {
    const url = new URL(href, window.location.origin);
    return { path: url.pathname.replace(/^\/+|\/+$/g, ""), params: url.searchParams };
  }, [href]);
}

function writeUrl(path: string, params: URLSearchParams, mode: "push" | "replace") {
  const query = params.toString();
  const href = `/${path}${query ? `?${query}` : ""}`;
  if (mode === "push") {
    window.history.pushState(null, "", href);
  } else {
    window.history.replaceState(null, "", href + window.location.hash);
  }
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

export function navigate(path: string) {
  const current = new URLSearchParams(window.location.search);
  const kept = new URLSearchParams();
  for (const name of SHELL_PARAMS) {
    const value = current.get(name);
    if (value) {
      kept.set(name, value);
    }
  }
  writeUrl(path, kept, "push");
}

export function setParam(name: string, value: string | null) {
  const params = new URLSearchParams(window.location.search);
  if (value === null) {
    params.delete(name);
  } else {
    params.set(name, value);
  }
  writeUrl(window.location.pathname.replace(/^\/+/, ""), params, "replace");
}

export function clearParams(names: string[]) {
  const params = new URLSearchParams(window.location.search);
  for (const name of names) {
    params.delete(name);
  }
  writeUrl(window.location.pathname.replace(/^\/+/, ""), params, "replace");
}
