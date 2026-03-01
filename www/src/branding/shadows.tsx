import { Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

export function Shadows() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Layers className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Shadows</h2>
      </div>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • <code>shadow-xs</code> — Subtle, inputs
          </p>
          <p>
            • <code>shadow-sm</code> / <code>shadow</code> — Cards, buttons
          </p>
          <p>
            • <code>shadow-md</code> — Dropdowns, popovers
          </p>
          <p>
            • <code>shadow-lg</code> — Modals, dialogs
          </p>
          <p className="pt-2 text-xs">
            Use shadows sparingly. They create depth hierarchy in dark themes.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Shadow Values</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "None", class: "" },
              { name: "XS", class: "shadow-xs" },
              { name: "SM", class: "shadow-sm" },
              { name: "Default", class: "shadow" },
              { name: "MD", class: "shadow-md" },
              { name: "LG", class: "shadow-lg" },
            ].map((shadow) => (
              <Card key={shadow.name}>
                <CardContent className="space-y-2">
                  <Card className={`${shadow.class} h-20 flex items-center justify-center`}>
                    <CardContent>{shadow.name}</CardContent>
                  </Card>
                  <p className="text-xs text-muted-foreground font-mono text-center">
                    {shadow.class || "none"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
