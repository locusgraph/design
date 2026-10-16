import { type PageSection, Tabs, TabsContent, TabsList, TabsTrigger } from "@locusgraph/components";
import type * as React from "react";
import { CodeBlock, type CodeLanguage } from "../preview/code-block";
import * as snippets from "./installation-snippets";

export const installationSections: PageSection[] = [
  { id: "add-the-package", title: "Add the package" },
  { id: "copy-with-shadcn", title: "Or copy with shadcn" },
  { id: "add-tailwind", title: "Add Tailwind" },
  { id: "import-the-theme", title: "Import the theme" },
  { id: "configure-the-bundler", title: "Configure the bundler" },
  { id: "add-providers", title: "Add providers" },
  { id: "use-a-component", title: "Use a component" },
  { id: "dark-mode", title: "Dark mode" },
];

function Code({ code, language }: { code: string; language?: CodeLanguage }) {
  return <CodeBlock code={code} language={language} className="not-typeset border bg-surface" />;
}

function Step({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="typeset typeset-docs">{children}</div>;
}

export function InstallationPage() {
  return (
    <article className="mx-auto flex w-full max-w-160 min-w-0 flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Installation</h1>
        <p className="text-balance text-muted-foreground md:max-w-[80%]">
          Use @locusgraph/components in any React 19 app, with Vite or with Next.js.
        </p>
      </header>
      <Step id="add-the-package" title="Add the package">
        <Prose>
          <p>The package is on npm. A fix or a new component reaches your app as a new version.</p>
        </Prose>
        <Code code={snippets.addFromRegistry} language="bash" />
      </Step>
      <Step id="copy-with-shadcn" title="Or copy with shadcn">
        <Prose>
          <p>
            To own the code instead, add the components with the shadcn CLI. Each one is copied into
            components/locus with the parts it needs. Register the registry once in components.json.
          </p>
        </Prose>
        <Code code={snippets.shadcnRegistry} language="json" />
        <Code code={snippets.shadcnAdd} language="bash" />
        <Prose>
          <p>
            The theme lands in styles/locus.css. Import it after Tailwind; it also sets the shadcn
            colors and radius in your global CSS, so existing shadcn components match. If shadcn
            init added a font such as Geist to your layout, remove it to use Inter. With pnpm 12,
            set the @carbon/icons-react and @carbon/icon-helpers install scripts to false under
            allowBuilds; they only send telemetry.
          </p>
        </Prose>
        <Code code={snippets.shadcnTheme} language="css" />
      </Step>
      <Step id="add-tailwind" title="Add Tailwind">
        <Prose>
          <p>
            The components are styled with Tailwind 4. From your app folder, add Tailwind and its
            animation utilities.
          </p>
        </Prose>
        <Code code={snippets.tailwindDependencies} language="bash" />
      </Step>
      <Step id="import-the-theme" title="Import the theme">
        <Prose>
          <p>
            Import the theme in your global CSS after Tailwind. It brings the colors, the Inter,
            Archivo and Fira Code fonts, the typeset styles, and tells Tailwind to scan the
            components for their classes.
          </p>
        </Prose>
        <Code code={snippets.globalsCss} language="css" />
      </Step>
      <Step id="configure-the-bundler" title="Configure the bundler">
        <Tabs defaultValue="vite">
          <TabsList>
            <TabsTrigger value="vite">Vite</TabsTrigger>
            <TabsTrigger value="next">Next.js</TabsTrigger>
          </TabsList>
          <TabsContent value="vite" className="flex flex-col gap-4 pt-2">
            <Prose>
              <p>Add the Tailwind plugin.</p>
            </Prose>
            <Code code={snippets.viteConfig} />
          </TabsContent>
          <TabsContent value="next" className="flex flex-col gap-4 pt-2">
            <Prose>
              <p>
                Let Next.js transpile the package and optimize its imports, which keeps dev builds
                fast with its single entry point.
              </p>
            </Prose>
            <Code code={snippets.nextConfig} />
            <Prose>
              <p>Next.js loads Tailwind through PostCSS.</p>
            </Prose>
            <Code code={snippets.nextPostcss} />
          </TabsContent>
        </Tabs>
      </Step>
      <Step id="add-providers" title="Add providers">
        <Prose>
          <p>
            Tooltips need a TooltipProvider, and toasts need one Toaster. Render both once near the
            root. The App Shell and Docs Shell already include a TooltipProvider.
          </p>
        </Prose>
        <Code code={snippets.rootProviders} />
      </Step>
      <Step id="use-a-component" title="Use a component">
        <Prose>
          <p>
            Import from the package root. Only the components you import reach the browser, so
            importing from one entry point costs nothing extra.
          </p>
        </Prose>
        <Code code={snippets.firstComponent} />
      </Step>
      <Step id="dark-mode" title="Dark mode">
        <Prose>
          <p>
            The theme switches on a dark class on the html element. Set it from your theme setting.
          </p>
        </Prose>
        <Code code={snippets.darkMode} />
      </Step>
    </article>
  );
}
