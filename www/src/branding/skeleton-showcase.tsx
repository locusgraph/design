import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Skeleton } from "@locus/components";

export function SkeletonShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Skeleton</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Show skeletons immediately on page load (no delay)</p>
          <p>• Match skeleton shapes to actual content layout</p>
          <p>
            • Use <code>rounded-full</code> for avatars, <code>rounded</code> for text
          </p>
          <p>• Keep skeleton visible for minimum 200ms to avoid flicker</p>
          <p className="pt-2 text-xs">
            Skeletons improve perceived performance. Always show layout structure during loading.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Shapes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avatar + Text</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card Skeleton</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Table Skeleton</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
