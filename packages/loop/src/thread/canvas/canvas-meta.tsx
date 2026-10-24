import { type CanvasVersion, metaLinkClass, VersionSwitcher } from "./version-switcher";

type CanvasMetaProps = {
  kind?: string;
  versions: CanvasVersion[];
  current?: CanvasVersion;
  onVersionChange?: (id: string) => void;
};

function Dot() {
  return <span aria-hidden>·</span>;
}

export function CanvasMeta({ kind, versions, current, onVersionChange }: CanvasMetaProps) {
  const latest = versions.at(-1);
  const viewingOlder = current && latest && current.id !== latest.id && onVersionChange;
  if (!kind && !current) return null;
  return (
    <p className="flex min-w-0 flex-wrap items-center gap-x-1.5 text-xs text-faint">
      {kind && <span>{kind}</span>}
      {kind && current && <Dot />}
      {current && (
        <VersionSwitcher versions={versions} current={current} onVersionChange={onVersionChange} />
      )}
      {viewingOlder && (
        <>
          <Dot />
          <button
            type="button"
            className={metaLinkClass}
            onClick={() => onVersionChange(latest.id)}
          >
            Back to latest
          </button>
        </>
      )}
    </p>
  );
}
