import { useSyncExternalStore } from "react";

export const packageManagers = ["pnpm", "npm", "yarn", "bun"] as const;

export type PackageManager = (typeof packageManagers)[number];

const storageKey = "locus-docs:package-manager";

const addCommand: Record<PackageManager, string> = {
  pnpm: "pnpm add",
  npm: "npm i",
  yarn: "yarn add",
  bun: "bun add",
};

const runPackageCommand: Record<PackageManager, string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
};

function isPackageManager(value: unknown): value is PackageManager {
  return packageManagers.includes(value as PackageManager);
}

function readStoredPackageManager(): PackageManager {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return isPackageManager(stored) ? stored : "pnpm";
  } catch {
    return "pnpm";
  }
}

let selected: PackageManager | undefined;
const listeners = new Set<() => void>();

function currentPackageManager() {
  selected ??= readStoredPackageManager();
  return selected;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function storePackageManager(packageManager: PackageManager) {
  try {
    window.localStorage.setItem(storageKey, packageManager);
    return true;
  } catch {
    return false;
  }
}

export function selectPackageManager(packageManager: PackageManager) {
  selected = packageManager;
  storePackageManager(packageManager);
  for (const listener of listeners) listener();
}

export function usePackageManager() {
  return useSyncExternalStore(subscribe, currentPackageManager, () => "pnpm" as PackageManager);
}

export function addPackagesCommand(packageManager: PackageManager, packages: string[]) {
  return `${addCommand[packageManager]} ${packages.join(" ")}`;
}

export function shadcnAddCommand(packageManager: PackageManager, registryName: string) {
  return `${runPackageCommand[packageManager]} shadcn@latest add @locus/${registryName}`;
}
