import { Window } from "happy-dom";

const sharedGlobals = [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "Element",
  "Node",
  "Event",
];

export function installDom() {
  const window = new Window({ url: "http://localhost/" });
  for (const key of sharedGlobals) {
    Object.defineProperty(globalThis, key, { configurable: true, value: Reflect.get(window, key) });
  }
  Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
}
