import type { HighlighterCore } from "shiki/core";

const lightTheme = "github-light";
const darkTheme = "github-dark";

let highlighter: Promise<HighlighterCore> | undefined;

function loadHighlighter() {
  highlighter ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/themes"),
  ]).then(([core, engine, themes]) =>
    core.createHighlighterCore({
      themes: [themes.bundledThemes[lightTheme](), themes.bundledThemes[darkTheme]()],
      langs: [],
      engine: engine.createJavaScriptRegexEngine(),
    })
  );
  return highlighter;
}

async function loadLanguage(loaded: HighlighterCore, language: string) {
  if (loaded.getLoadedLanguages().includes(language)) {
    return true;
  }
  const { bundledLanguages } = await import("shiki/langs");
  const loader = bundledLanguages[language as keyof typeof bundledLanguages];
  if (!loader) {
    return false;
  }
  await loaded.loadLanguage(loader());
  return true;
}

export async function highlightToHtml(code: string, language: string): Promise<string | null> {
  const normalized = language.toLowerCase();
  const loaded = await loadHighlighter();
  if (!(await loadLanguage(loaded, normalized))) {
    return null;
  }
  return loaded.codeToHtml(code, {
    lang: normalized,
    themes: { light: lightTheme, dark: darkTheme },
    defaultColor: false,
  });
}
