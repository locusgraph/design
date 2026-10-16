import { useEffect, useState } from "react";

type RegistryCatalog = { items: { name: string }[] };

let catalogRequest: Promise<Set<string>> | undefined;

function loadRegistryNames() {
  catalogRequest ??= fetch("/r/registry.json")
    .then((response) =>
      response.ok ? (response.json() as Promise<RegistryCatalog>) : { items: [] }
    )
    .then((catalog) => new Set(catalog.items.map((item) => item.name)))
    .catch(() => new Set<string>());
  return catalogRequest;
}

export function useRegistryItem(name: string) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let current = true;
    void loadRegistryNames().then((names) => {
      if (current) setAvailable(names.has(name));
    });
    return () => {
      current = false;
    };
  }, [name]);
  return available;
}
