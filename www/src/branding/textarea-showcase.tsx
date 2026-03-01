import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Label } from "@locus/components";
import { Textarea } from "@locus/components";

export function TextareaShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Textarea</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for multi-line text input (descriptions, notes)</p>
          <p>
            • Default minimum height is <code>80px</code>
          </p>
          <p>
            • Use <code>rows</code> prop to adjust height
          </p>
          <p>• Matches Input styling for consistency</p>
          <p className="pt-2 text-xs">
            Consider character limits for long-form content. Show remaining count if limited.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent className="max-w-md">
          <Textarea placeholder="Type your message here..." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Label</CardTitle>
        </CardHeader>
        <CardContent className="max-w-md space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe your graph..." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Default Value</CardTitle>
        </CardHeader>
        <CardContent className="max-w-md">
          <Textarea defaultValue="This is some pre-filled content that can be edited by the user." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disabled</CardTitle>
        </CardHeader>
        <CardContent className="max-w-md">
          <Textarea disabled placeholder="This textarea is disabled" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Rows</CardTitle>
        </CardHeader>
        <CardContent className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label>Small (3 rows)</Label>
            <Textarea rows={3} placeholder="Smaller textarea" />
          </div>
          <div className="space-y-2">
            <Label>Large (8 rows)</Label>
            <Textarea rows={8} placeholder="Larger textarea" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
