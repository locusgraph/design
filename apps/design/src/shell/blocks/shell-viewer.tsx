import { useRef, useState } from "react";
import type { ShellEntry } from "../../shells/load-shells";
import type { Theme } from "../../url-state";
import { CodeBlock } from "../preview/code-block";
import { ShellToolbar, type ShellView, type ShellViewport } from "./shell-toolbar";

const viewportWidth: Record<ShellViewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

export function ShellViewer({ shell, theme }: { shell: ShellEntry; theme: Theme }) {
  const [view, setView] = useState<ShellView>("preview");
  const [viewport, setViewport] = useState<ShellViewport>("desktop");
  const [reloadCount, setReloadCount] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const frameUrl = `/frame.html?shell=${shell.id}&theme=${theme}${view === "layout" ? "&outline=1" : ""}`;

  return (
    <section id={shell.id} className="flex scroll-mt-24 flex-col gap-4">
      <ShellToolbar
        title={shell.title}
        description={shell.description}
        view={view}
        viewport={viewport}
        frameUrl={frameUrl}
        onViewChange={setView}
        onViewportChange={setViewport}
        onReload={() => setReloadCount((count) => count + 1)}
        onFullscreen={() => void stage.current?.requestFullscreen()}
      />
      {view !== "code" ? (
        <div
          ref={stage}
          className="flex justify-center bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] p-2 [&:fullscreen]:p-0"
        >
          <iframe
            key={`${theme}-${view}-${reloadCount}`}
            title={`${shell.title} preview`}
            src={frameUrl}
            style={{ width: viewportWidth[viewport] }}
            className="h-[780px] max-w-full border bg-background transition-[width] duration-300 [:fullscreen_&]:h-full [:fullscreen_&]:border-0"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <CodeBlock code={shell.importLine} className="border bg-surface" />
          <CodeBlock
            code={shell.source}
            className="max-h-[780px] overflow-y-auto border bg-surface"
          />
        </div>
      )}
    </section>
  );
}
