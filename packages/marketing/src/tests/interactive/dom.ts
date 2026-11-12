import { Window } from "happy-dom";
import { act, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";

const sharedGlobals = [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "HTMLFormElement",
  "Element",
  "Node",
  "Event",
  "FormData",
];

export function installDom() {
  const window = new Window({ url: "http://localhost/" });
  for (const key of sharedGlobals) {
    Object.defineProperty(globalThis, key, { configurable: true, value: Reflect.get(window, key) });
  }
  Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
}

export type Mounted = { container: HTMLElement; unmount: () => Promise<void> };

export async function mount(node: ReactNode): Promise<Mounted> {
  const container = document.createElement("div");
  document.body.append(container);
  const root: Root = createRoot(container);
  await act(async () => root.render(node));
  return {
    container,
    unmount: async () => {
      await act(async () => root.unmount());
      container.remove();
    },
  };
}
