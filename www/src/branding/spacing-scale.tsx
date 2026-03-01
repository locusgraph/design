import { MoveVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

export function SpacingScale() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <MoveVertical className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Spacing Scale</h2>
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
            • Base unit: <code>0.25rem</code> (4px) increments
          </p>
          <p>
            • Utilities: <code>p-{"{n}"}</code> (padding),{" "}
            <code>m-{"{n}"}</code> (margin),
            <code>gap-{"{n}"}</code>
          </p>
          <p>
            • Common: <code>1</code> (4px), <code>2</code> (8px), <code>4</code>{" "}
            (16px),
            <code>5</code> (20px), <code>6</code> (24px), <code>8</code> (32px)
          </p>
          <p>
            • Large: <code>12</code> (48px), <code>16</code> (64px),{" "}
            <code>24</code> (96px)
          </p>
          <p className="pt-2 text-xs">
            Use consistent spacing multiples for visual rhythm.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Spacing Values</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between flex-col gap-4">
            {[1, 2, 3, 4, 5, 6, 8, 12, 16, 24, 32].map((size) => (
              <Card key={size}>
                <CardContent className="flex items-center gap-4">
                  <div className="w-20 text-sm text-muted-foreground font-mono shrink-0">
                    {size * 0.25}rem
                  </div>
                  <div className="flex-1 bg-primary/20 rounded flex items-center p-2">
                    <div
                      className="bg-primary rounded shrink-0"
                      style={{
                        width: `${size * 0.25}rem`,
                        height: `${size * 0.25}rem`,
                      }}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground font-mono shrink-0">
                    p-{size}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
