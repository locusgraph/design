import { Button, cn } from "@locusgraph/components";
import { Check as CheckIcon, Copy as CopyIcon } from "@phosphor-icons/react/ssr";
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

function useHighlightedHtml(code: string, language: CodeLanguage) {
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Copy code"
      onClick={copy}
      className="absolute top-2 right-2 bg-surface hover:bg-accent"
    >
      {copied ? <CheckIcon weight="bold" aria-hidden /> : <CopyIcon weight="bold" aria-hidden />}
    </Button>
  );
}

type CodeBlockProps = {
  code: string;
  className?: string;
  showCopy?: boolean;
  language?: CodeLanguage;
};

export function CodeBlock({ code, className, showCopy = true, language = "tsx" }: CodeBlockProps) {
  const html = useHighlightedHtml(code, language);
  const codeClass =
    "overflow-x-auto p-4 pr-12 font-mono text-sm [&_pre]:outline-none has-[pre:focus-visible]:outline-2 has-[pre:focus-visible]:-outline-offset-2 has-[pre:focus-visible]:outline-ring/70";
  return (
    <div className={cn("relative", className)}>
      {showCopy && <CopyButton text={code} />}
      {html ? (
        <div className={codeClass} dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className={codeClass}>{code}</pre>
      )}
    </div>
  );
}
