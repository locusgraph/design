import { Window } from "happy-dom";

const viewportSize = { width: 720, height: 800 };
const rowHeight = 96;

function exposeWindowGlobals(window) {
  for (const key of Object.getOwnPropertyNames(window)) {
    if (key in globalThis) continue;
    Object.defineProperty(globalThis, key, {
      configurable: true,
      get: () => window[key],
    });
  }
  for (const key of ["window", "document", "navigator", "HTMLElement", "Element", "Node"]) {
    Object.defineProperty(globalThis, key, { configurable: true, value: window[key] });
  }
}

function simulateLayout(window) {
  const proto = window.HTMLElement.prototype;
  Object.defineProperty(proto, "offsetHeight", { get: () => viewportSize.height });
  Object.defineProperty(proto, "offsetWidth", { get: () => viewportSize.width });
  Object.defineProperty(proto, "clientHeight", { get: () => viewportSize.height });
  proto.getBoundingClientRect = () => ({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    bottom: rowHeight,
    right: viewportSize.width,
    width: viewportSize.width,
    height: rowHeight,
    toJSON: () => ({}),
  });
}

export function installDom() {
  const window = new Window({ url: "http://localhost/", width: 1280, height: 900 });
  exposeWindowGlobals(window);
  simulateLayout(window);
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  return window;
}
