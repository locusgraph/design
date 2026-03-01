import { Check, Plus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { PillButton } from "@locus/components";

const PILL_BUTTON_VARIANTS = [
  { name: "Default", variant: "default" as const },
  { name: "Secondary", variant: "secondary" as const },
  { name: "Destructive", variant: "destructive" as const },
  { name: "Destructive Outline", variant: "destructive-outline" as const },
  { name: "Confirm", variant: "confirm" as const },
  { name: "Ghost", variant: "ghost" as const },
  { name: "Link", variant: "link" as const },
] as const;

const PILL_BUTTON_SIZES = [
  { name: "XS (default)", size: "xs" as const },
  { name: "Large", size: "lg" as const },
] as const;

export function PillButtonShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Pill Button</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">
            Design Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Pill buttons use{" "}
            <code className="rounded bg-primary-800 px-1 py-0.5">
              rounded-sm
            </code>{" "}
            for fully rounded corners. Use for tags, filters, chips, or when a
            softer, pill-shaped appearance is preferred over standard buttons.
          </p>
          <p className="pt-2 text-xs">
            Variants match Button. Sizes: xs (default) and lg. Best for compact
            UI areas and inline actions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {PILL_BUTTON_VARIANTS.map(({ name, variant }) => (
              <PillButton key={variant} variant={variant}>
                {name}
              </PillButton>
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
            {PILL_BUTTON_SIZES.map(({ name, size }) => (
              <PillButton key={size} size={size}>
                {name}
              </PillButton>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Icons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <PillButton>
            <Plus className="size-4" />
            Create
          </PillButton>
          <PillButton variant="secondary">
            <Plus className="size-4" />
            Secondary
          </PillButton>
          <PillButton variant="destructive">
            <Trash className="size-4" />
            Delete
          </PillButton>
          <PillButton variant="destructive-outline">
            <Trash className="size-4" />
            Remove
          </PillButton>
          <PillButton variant="confirm">
            <Check className="size-4" />
            Confirm
          </PillButton>
          <PillButton variant="ghost">
            <Plus className="size-4" />
            Ghost
          </PillButton>
          <PillButton variant="link">
            <Plus className="size-4" />
            Link
          </PillButton>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {PILL_BUTTON_VARIANTS.slice(0, 5).map(({ name, variant }) => (
              <PillButton key={variant} variant={variant} disabled>
                {name}
              </PillButton>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
