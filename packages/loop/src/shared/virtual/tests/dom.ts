import { Window } from "happy-dom";

const viewportHeightPx = 800;
const viewportWidthPx = 720;
const itemHeightPx = 100;

const sharedGlobals = [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "Element",
  "Node",
  "Event",
  "FocusEvent",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "ResizeObserver",
  "getComputedStyle",
];

export function installDom() {
  const window = new Window({ url: "http://localhost/" });
  const proto = window.HTMLElement.prototype;
  Object.defineProperty(proto, "offsetHeight", { get: () => viewportHeightPx });
  Object.defineProperty(proto, "offsetWidth", { get: () => viewportWidthPx });
  Object.defineProperty(proto, "clientHeight", { get: () => viewportHeightPx });
  proto.getBoundingClientRect = () => new window.DOMRect(0, 0, viewportWidthPx, itemHeightPx);
  for (const key of sharedGlobals) {
    Object.defineProperty(globalThis, key, { configurable: true, value: Reflect.get(window, key) });
  }
  Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
}
