import { Check, Plus, Trash } from "lucide-react";
import { Button } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

const BUTTON_VARIANTS = [
  { name: "Default", variant: "default" as const },
  { name: "Secondary", variant: "secondary" as const },
  { name: "Destructive", variant: "destructive" as const },
  { name: "Destructive Icon", variant: "destructive-icon" as const },
  { name: "Destructive Outline", variant: "destructive-outline" as const },
  { name: "Confirm", variant: "confirm" as const },
  { name: "Confirm Icon", variant: "confirm-icon" as const },
  { name: "Ghost", variant: "ghost" as const },
  { name: "Link", variant: "link" as const },
] as const;

const BUTTON_SIZES = [
  { name: "XS", size: "xs" as const },
  { name: "Small", size: "sm" as const },
  { name: "Default", size: "default" as const },
  { name: "Large", size: "lg" as const },
  { name: "Icon XS", size: "icon-xs" as const },
  { name: "Icon", size: "icon" as const },
  { name: "Icon SM", size: "icon-sm" as const },
  { name: "Icon LG", size: "icon-lg" as const },
] as const;

export function ButtonShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Button</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • <strong>Default</strong> — Primary actions (Create, Save, Submit)
          </p>
          <p>
            • <strong>Secondary</strong> — Secondary actions (Cancel, Back)
          </p>
          <p>
            • <strong>Destructive</strong> — Dangerous actions (Delete, Remove)
          </p>
          <p>
            • <strong>Destructive Icon</strong> — Icon-only destructive actions
          </p>
          <p>
            • <strong>Destructive Outline</strong> — Outlined destructive actions
          </p>
          <p>
            • <strong>Confirm</strong> — Success/confirmation actions
          </p>
          <p>
            • <strong>Confirm Icon</strong> — Icon-only confirmation actions
          </p>
          <p>
            • <strong>Ghost</strong> — Tertiary actions, icon-only buttons
          </p>
          <p>
            • <strong>Link</strong> — Navigation that looks like text
          </p>
          <p className="pt-2 text-xs">
            Always include icons for primary CTAs. Use consistent sizing within button groups.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {BUTTON_VARIANTS.map(({ name, variant }) => (
              <Button
                key={variant}
                variant={variant}
                size={
                  variant === "destructive-icon" || variant === "confirm-icon" ? "icon" : undefined
                }
                aria-label={
                  variant === "destructive-icon"
                    ? "Delete"
                    : variant === "confirm-icon"
                      ? "Confirm"
                      : name
                }
              >
                {variant === "destructive-icon" ? (
                  <Trash className="size-4" aria-hidden />
                ) : variant === "confirm-icon" ? (
                  <Check className="size-4" aria-hidden />
                ) : (
                  name
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            {BUTTON_SIZES.map(({ name, size }) => (
              <Button
                key={size}
                size={size}
                variant={size.startsWith("icon") ? "secondary" : "default"}
              >
                {size.startsWith("icon") ? (
                  <Plus
                    className={
                      size === "icon-xs" ? "size-3" : size === "icon-lg" ? "size-5" : "size-4"
                    }
                    aria-hidden
                  />
                ) : (
                  name
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            {BUTTON_SIZES.filter((s) => !s.size.startsWith("icon")).map(({ name, size }) => (
              <Button key={size} size={size}>
                {name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Icons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button>
            <Plus className="size-4" />
            Create
          </Button>
          <Button variant="secondary">
            <Plus className="size-4" />
            Secondary
          </Button>
          <Button variant="destructive">
            <Trash className="size-4" />
            Delete
          </Button>
          <Button variant="destructive-outline">
            <Trash className="size-4" />
            Remove
          </Button>
          <Button variant="confirm">
            <Check className="size-4" />
            Confirm
          </Button>
          <Button variant="ghost">
            <Plus className="size-4" />
            Ghost
          </Button>
          <Button variant="link">
            <Plus className="size-4" />
            Link
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {BUTTON_VARIANTS.slice(0, 5).map(({ name, variant }) => (
              <Button
                key={variant}
                variant={variant}
                disabled
                size={
                  variant === "destructive-icon" || variant === "confirm-icon" ? "icon" : undefined
                }
                aria-label={
                  variant === "destructive-icon"
                    ? "Delete"
                    : variant === "confirm-icon"
                      ? "Confirm"
                      : name
                }
              >
                {variant === "destructive-icon" ? (
                  <Trash className="size-4" aria-hidden />
                ) : variant === "confirm-icon" ? (
                  <Check className="size-4" aria-hidden />
                ) : (
                  name
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
