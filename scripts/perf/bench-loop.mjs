import { createRequire, register } from "node:module";
import { installDom } from "./dom.mjs";
import { benchNow, chatMessages, historyThreads, inboxItems } from "./fixtures.mjs";

register("../published-resolve.mjs", import.meta.url);
installDom();

const requireFromLoop = createRequire(new URL("../../packages/loop/package.json", import.meta.url));
const React = requireFromLoop("react");
const { createRoot } = requireFromLoop("react-dom/client");
const { Chat, History, Inbox, Turn } = await import("@locusgraph/loop");
const h = React.createElement;
const noop = () => {};

function chatTree(messages) {
  return h(
    "div",
    { style: { height: "800px" } },
    h(
      Chat,
      null,
      messages.map((message) => h(Turn, { key: message.id, message }))
    )
  );
}

function historyTree(threads) {
  return h(History, { threads, activeId: "thr_3", now: new Date(benchNow), onSelect: noop });
}

function inboxTree(items) {
  return h(Inbox, {
    items,
    now: benchNow,
    onApprove: noop,
    onDeny: noop,
    onApproveAll: noop,
  });
}

function timed(action) {
  const start = performance.now();
  React.act(action);
  return performance.now() - start;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

const updatesPerMount = 6;

function medianUpdate(root, build, initial, next) {
  const samples = [];
  for (let update = 0; update < updatesPerMount; update += 1) {
    const list = update % 2 === 0 ? next : initial;
    samples.push(timed(() => root.render(build(list))));
  }
  return median(samples.filter((_, update) => update % 2 === 0));
}

function measure(build, initial, next, runs) {
  const mounts = [];
  const updates = [];
  let domNodes = 0;
  for (let run = 0; run <= runs; run += 1) {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const mountMs = timed(() => root.render(build(initial)));
    domNodes = container.querySelectorAll("*").length;
    const updateMs = medianUpdate(root, build, initial, next);
    React.act(() => root.unmount());
    container.remove();
    if (run === 0) continue;
    mounts.push(mountMs);
    updates.push(updateMs);
  }
  return { mount: median(mounts), update: median(updates), domNodes };
}

function withAppended(list, item) {
  return [...list, item];
}

const cases = [];
for (const turns of [100, 500, 2000]) {
  const messages = chatMessages(turns);
  const next = withAppended(messages, chatMessages(turns + 1).at(-1));
  cases.push({
    name: `Chat + Turn, ${turns} turns`,
    build: chatTree,
    initial: messages,
    next,
    runs: turns > 500 ? 5 : 9,
  });
}
const threads = historyThreads(1000);
cases.push({
  name: "History, 1000 threads",
  build: historyTree,
  initial: threads,
  next: [
    { id: "thr_new", title: "New thread", updatedAt: new Date(benchNow).toISOString() },
    ...threads,
  ],
  runs: 9,
});
const items = inboxItems(500);
cases.push({
  name: "Inbox, 500 items",
  build: inboxTree,
  initial: items,
  next: withAppended(items, inboxItems(501).at(-1)),
  runs: 9,
});

const only = process.argv[2];
console.log("| case | mount median ms | update median ms | DOM nodes |");
console.log("|---|---|---|---|");
for (const benchCase of cases) {
  if (only && !benchCase.name.includes(only)) continue;
  const result = measure(benchCase.build, benchCase.initial, benchCase.next, benchCase.runs);
  console.log(
    `| ${benchCase.name} | ${result.mount.toFixed(1)} | ${result.update.toFixed(1)} | ${result.domNodes} |`
  );
}
process.exit(0);
