import { Type } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

export function Typography() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Type className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Typography</h2>
      </div>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • Headings: <code>text-4xl</code> (h1), <code>text-3xl</code> (h2),{" "}
            <code>text-2xl</code> (h3), <code>text-xl</code> (h4)
          </p>
          <p>
            • Body: <code>text-base</code> (default), <code>text-sm</code> (small)
          </p>
          <p>
            • Weights: <code>font-bold</code> (h1), <code>font-semibold</code> (h2-h4),{" "}
            <code>font-light</code> (buttons)
          </p>
          <p>
            • Use <code>text-muted-foreground</code> for secondary text
          </p>
          <p className="pt-2 text-xs">Code text uses font-mono with muted background.</p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Headings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card>
              <CardContent>
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <p className="text-sm text-muted-foreground mt-1">text-4xl font-bold</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="text-3xl font-semibold">Heading 2</h2>
                <p className="text-sm text-muted-foreground mt-1">text-3xl font-semibold</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="text-2xl font-semibold">Heading 3</h3>
                <p className="text-sm text-muted-foreground mt-1">text-2xl font-semibold</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h4 className="text-xl font-semibold">Heading 4</h4>
                <p className="text-sm text-muted-foreground mt-1">text-xl font-semibold</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-base">Body text - Regular paragraph text</p>
                <p className="text-sm text-muted-foreground mt-1">text-base</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-muted-foreground">Small muted text</p>
                <p className="text-sm text-muted-foreground mt-1">text-sm text-muted-foreground</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded font-mono">Code text</code>
                <p className="text-sm text-muted-foreground mt-1">font-mono</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
