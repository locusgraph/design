import { Tabs, TabsContent, TabsList, TabsTrigger } from "@locusgraph/components";
import type * as React from "react";
import { PromptTab } from "../../theming/docs/prompt-tab";
import { CatalogList } from "./catalog-list";
import { SpecEditor } from "./spec-editor";

type GenerativeDocsPanelProps = {
  editor: React.ComponentProps<typeof SpecEditor>;
  prompt: string;
};

export function GenerativeDocsPanel({ editor, prompt }: GenerativeDocsPanelProps) {
  return (
    <Tabs
      defaultValue="spec"
      className="flex min-h-0 flex-col gap-0 bg-surface ring-1 ring-border lg:h-full"
    >
      <div className="flex min-h-14 items-center border-b bg-muted/35 px-4">
        <TabsList>
          <TabsTrigger value="spec">Spec</TabsTrigger>
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="spec" className="flex min-h-0 flex-1 flex-col">
        <SpecEditor {...editor} />
      </TabsContent>
      <TabsContent value="catalog" className="flex min-h-0 flex-col gap-4 overflow-y-auto p-4">
        <CatalogList />
      </TabsContent>
      <TabsContent value="prompt" className="flex min-h-0 flex-col gap-4 overflow-y-auto p-4">
        <PromptTab
          prompt={prompt}
          note="catalog.prompt() writes this from the catalog. Send it as the system prompt."
        />
      </TabsContent>
    </Tabs>
  );
}
