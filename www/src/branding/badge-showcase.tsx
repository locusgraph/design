import { Badge } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

export function BadgeShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Badge</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • <strong>Default</strong> — Primary emphasis, counts
          </p>
          <p>
            • <strong>Secondary</strong> — Neutral tags, categories
          </p>
          <p>
            • <strong>Confirm</strong> — Success states (Active, Complete)
          </p>
          <p>
            • <strong>Destructive</strong> — Error states (Revoked, Failed)
          </p>
          <p>
            • <strong>Notice</strong> — Warning states (Pending, Expiring)
          </p>
          <p className="pt-2 text-xs">
            Keep badge text short (1-2 words). Use semantic colors consistently.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="confirm">Confirm</Badge>
          <Badge variant="notice">Notice</Badge>
          <Badge variant="outline">Outline</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Use Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Status:</span>
            <Badge variant="confirm">Active</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Permission:</span>
            <Badge variant="secondary">Read</Badge>
            <Badge variant="secondary">Write</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Count:</span>
            <Badge>12</Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
