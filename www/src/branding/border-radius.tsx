import { Box } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

export function BorderRadius() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Box className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Border Radius</h2>
      </div>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">
            Design Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • <code>rounded-sm</code> (8px) — Subtle rounding
          </p>
          <p>
            • <code>rounded-md</code> (12px) — Default for inputs, buttons
          </p>
          <p>
            • <code>rounded-lg</code> (16px) — Cards, dialogs
          </p>
          <p>
            • <code>rounded-xl</code> (20px) — Cards, dialogs, graphs
          </p>
          <p>
            • <code>rounded-2xl</code> (24px) — Cards, dialogs, graphs
          </p>
          <p>
            • <code>rounded-3xl</code> (32px) — Cards, dialogs, graphs
          </p>
          <p>
            • <code>rounded-full</code> — Avatars, pills, badges
          </p>
          <p className="pt-2 text-xs">
            Use consistent radius within component groups.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Radius Values</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Small", class: "rounded-sm" },
              { name: "Default", class: "rounded-md" },
              { name: "Large", class: "rounded-lg" },
              { name: "XL", class: "rounded-xl" },
              { name: "2XL", class: "rounded-2xl" },
              { name: "3XL", class: "rounded-3xl" },
              { name: "Full", class: "rounded-full" },
            ].map((radius) => (
              <Card
                key={radius.name}
                className="border-neutral-700 overflow-hidden"
              >
                <CardContent className="space-y-2">
                  <div
                    className={`${radius.class} border-2 border-neutral-600 bg-primary h-16 flex items-center justify-center text-primary-foreground text-sm font-medium`}
                  >
                    {radius.name}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono text-center">
                    {radius.class}
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
