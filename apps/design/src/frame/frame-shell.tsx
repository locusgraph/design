import { useDocumentTheme } from "../shell/theme";
import { findShellEntry } from "../shells/load-shells";

type FrameShellProps = { id: string; theme: "light" | "dark" };

export function FrameShell({ id, theme }: FrameShellProps) {
  useDocumentTheme(theme);
  const entry = findShellEntry(id);
  if (!entry) {
    return <p className="p-8 text-sm text-muted-foreground">Unknown shell: {id}</p>;
  }
  const Shell = entry.component;
  return <Shell />;
}
