import { useEffect, useState } from "react";
import type { HighlighterCore, LanguageRegistration } from "shiki/core";

export type CodeLanguage = "tsx" | "bash" | "json" | "css";

const languageLoaders: Record<CodeLanguage, () => Promise<{ default: LanguageRegistration[] }>> = {
  tsx: () => import("@shikijs/langs/tsx"),
  bash: () => import("@shikijs/langs/shellscript"),
  json: () => import("@shikijs/langs/json"),
  css: () => import("@shikijs/langs/css"),
};

const shikiLanguageName: Record<CodeLanguage, string> = {
  tsx: "tsx",
  bash: "shellscript",
  json: "json",
  css: "css",
};

let highlighter: Promise<HighlighterCore> | undefined;

function loadHighlighter() {
  highlighter ??= Promise.all([import("shiki/core"), import("shiki/engine/javascript")]).then(
    ([core, engine]) =>
      core.createHighlighterCore({
        themes: [import("@shikijs/themes/github-light"), import("@shikijs/themes/github-dark")],
        langs: [],
        engine: engine.createJavaScriptRegexEngine(),
      })
  );
  return highlighter;
}

async function highlighterFor(language: CodeLanguage) {
  const loaded = await loadHighlighter();
  if (!loaded.getLoadedLanguages().includes(shikiLanguageName[language])) {
    await loaded.loadLanguage((await languageLoaders[language]()).default);
  }
  return loaded;
}

export function useHighlightedHtml(code: string, language: CodeLanguage) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    let current = true;
    highlighterFor(language).then((loaded) => {
      if (current) {
        setHtml(
          loaded.codeToHtml(code, {
            lang: shikiLanguageName[language],
            themes: { light: "github-light", dark: "github-dark" },
          })
        );
      }
    });
    return () => {
      current = false;
    };
  }, [code, language]);
  return html;
}
