import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Separator } from "@locus/components";

export function SeparatorShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Separator</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use horizontal separators between sections</p>
          <p>• Use vertical separators in toolbars or inline groups</p>
          <p>• Prefer spacing over separators when possible</p>
          <p>
            • Separator uses <code>bg-border</code> color token
          </p>
          <p className="pt-2 text-xs">
            Separators are decorative by default. Add proper roles for accessibility if needed.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horizontal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Content above</p>
          <Separator />
          <p className="text-sm text-muted-foreground">Content below</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vertical</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-8 items-center gap-4">
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Middle</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Right</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In Lists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            <div className="py-3">
              <p className="text-sm font-medium">Item One</p>
              <p className="text-xs text-muted-foreground">Description for item one</p>
            </div>
            <Separator />
            <div className="py-3">
              <p className="text-sm font-medium">Item Two</p>
              <p className="text-xs text-muted-foreground">Description for item two</p>
            </div>
            <Separator />
            <div className="py-3">
              <p className="text-sm font-medium">Item Three</p>
              <p className="text-xs text-muted-foreground">Description for item three</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
