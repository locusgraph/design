import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

export function ToastShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Toast</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for temporary, non-blocking notifications</p>
          <p>
            • <strong>Default</strong> — Info messages
          </p>
          <p>
            • <strong>Confirm</strong> — Success messages (Saved, Created)
          </p>
          <p>
            • <strong>Destructive</strong> — Error messages
          </p>
          <p className="pt-2 text-xs">
            Auto-dismiss after 5 seconds. Include action button for undo when applicable.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 rounded-md border border-notice-700 bg-notice-900 p-4 text-notice-100">
            <AlertTriangle className="size-4" />
            <span className="text-sm">
              Toast requires a Toaster provider at the root of your app. See the toast.tsx file for
              implementation details.
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Toast Variants (Preview)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Default Toast Preview */}
          <div className="pointer-events-none relative flex w-full max-w-md items-center justify-between gap-4 overflow-hidden rounded-md border border-border bg-background p-4 pr-8 shadow-lg">
            <div className="grid gap-1">
              <div className="text-sm font-semibold">Default Toast</div>
              <div className="text-sm opacity-90">This is a default toast message.</div>
            </div>
          </div>

          {/* Destructive Toast Preview */}
          <div className="pointer-events-none relative flex w-full max-w-md items-center justify-between gap-4 overflow-hidden rounded-md border border-destructive bg-destructive p-4 pr-8 text-destructive-foreground shadow-lg">
            <div className="grid gap-1">
              <div className="text-sm font-semibold">Error Toast</div>
              <div className="text-sm opacity-90">Something went wrong. Please try again.</div>
            </div>
          </div>

          {/* Success Toast Preview */}
          <div className="pointer-events-none relative flex w-full max-w-md items-center justify-between gap-4 overflow-hidden rounded-md border border-confirm-700 bg-confirm-900 p-4 pr-8 text-confirm-100 shadow-lg">
            <div className="grid gap-1">
              <div className="text-sm font-semibold">Success Toast</div>
              <div className="text-sm opacity-90">Your changes have been saved.</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
            {`// 1. Add ToastProvider to root
import { ToastProvider, ToastViewport } from "@locus/components";

// In your root layout:
<ToastProvider>
  {children}
  <ToastViewport />
</ToastProvider>

// 2. Create a useToast hook or use directly
import { Toast, ToastTitle, ToastDescription } from "@locus/components";

<Toast>
  <ToastTitle>Title</ToastTitle>
  <ToastDescription>Description</ToastDescription>
</Toast>`}
          </pre>
        </CardContent>
      </Card>
    </section>
  );
}
