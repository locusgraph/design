import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Input } from "@locus/components";
import { Label } from "@locus/components";

export function InputShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Input</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • Always pair with a <strong>Label</strong> for accessibility
          </p>
          <p>
            • Use <strong>placeholder</strong> for format hints, not labels
          </p>
          <p>
            • Invalid state uses <code>aria-invalid="true"</code>
          </p>
          <p>
            • Default height is <code>h-9</code> (36px) to match buttons
          </p>
          <p className="pt-2 text-xs">
            Prefer specific input types (email, number, password) for better mobile keyboards.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent className="max-w-sm space-y-4">
          <Input placeholder="Enter text..." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Label</CardTitle>
        </CardHeader>
        <CardContent className="max-w-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Types</CardTitle>
        </CardHeader>
        <CardContent className="max-w-sm space-y-4">
          <div className="space-y-2">
            <Label>Text</Label>
            <Input type="text" placeholder="Text input" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Password" />
          </div>
          <div className="space-y-2">
            <Label>Number</Label>
            <Input type="number" placeholder="0" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>States</CardTitle>
        </CardHeader>
        <CardContent className="max-w-sm space-y-4">
          <div className="space-y-2">
            <Label>Disabled</Label>
            <Input disabled placeholder="Disabled input" />
          </div>
          <div className="space-y-2">
            <Label>Invalid</Label>
            <Input aria-invalid="true" placeholder="Invalid input" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
