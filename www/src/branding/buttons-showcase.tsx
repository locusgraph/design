import { Check, Layout, Link2, Moon, Palette, Sparkles, Sun, Trash2 } from "lucide-react";
import { Button } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

const BUTTON_VARIANTS = [
  { name: "Default", variant: "default" as const },
  { name: "Secondary", variant: "secondary" as const },
  { name: "Destructive", variant: "destructive" as const },
  { name: "Destructive icon", variant: "destructive-icon" as const },
  { name: "Destructive outline", variant: "destructive-outline" as const },
  { name: "Confirm", variant: "confirm" as const },
  { name: "Confirm icon", variant: "confirm-icon" as const },
  { name: "Ghost", variant: "ghost" as const },
  { name: "Link", variant: "link" as const },
] as const;

const BUTTON_SIZES = [
  { name: "XS", size: "xs" as const },
  { name: "Small", size: "sm" as const },
  { name: "Default", size: "default" as const },
  { name: "Large", size: "lg" as const },
  { name: "Icon xs", size: "icon-xs" as const },
  { name: "Icon", size: "icon" as const },
  { name: "Icon sm", size: "icon-sm" as const },
  { name: "Icon lg", size: "icon-lg" as const },
] as const;

export function ButtonsShowcase() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Layout className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Buttons</h2>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
              {BUTTON_VARIANTS.map(({ name, variant }) => (
                <div key={variant} className="flex flex-col items-center gap-2">
                  <Button
                    variant={variant}
                    size={
                      variant === "destructive-icon" || variant === "confirm-icon"
                        ? "icon"
                        : undefined
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
                      <Trash2 className="size-4" aria-hidden />
                    ) : variant === "confirm-icon" ? (
                      <Check className="size-4" aria-hidden />
                    ) : (
                      name
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sizes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
              {BUTTON_SIZES.map(({ name, size }) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Button size={size}>
                    {size.startsWith("icon") ? <Palette className="size-4" aria-hidden /> : name}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
              <div className="flex flex-col items-center gap-2">
                <Button>Default</Button>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button disabled>Disabled</Button>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button disabled className="cursor-wait">
                  Loading…
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Icons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-x-4 gap-y-4">
              <Button>
                <Sun className="size-4" />
                Default
              </Button>
              <Button variant="secondary">
                <Moon className="size-4" />
                Secondary
              </Button>
              <Button variant="destructive">
                <Trash2 className="size-4" />
                Destructive
              </Button>
              <Button variant="destructive-icon" size="icon">
                <Trash2 className="size-4" />
              </Button>
              <Button variant="destructive-outline">
                <Palette className="size-4" />
                Destructive outline
              </Button>
              <Button variant="confirm">
                <Check className="size-4" />
                Confirm
              </Button>
              <Button variant="confirm-icon" size="icon">
                <Check className="size-4" />
              </Button>
              <Button variant="ghost">
                Right
                <Sparkles className="size-4" />
              </Button>
              <Button variant="link">
                <Link2 className="size-4" />
                Link
              </Button>
              <Button size="icon-xs" variant="destructive-outline">
                <Palette className="size-3" />
              </Button>
              <Button size="icon" variant="secondary">
                <Palette className="size-4" />
              </Button>
              <Button size="icon-lg" variant="default">
                <Palette className="size-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Design Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                The button component uses class-variance-authority (CVA) for variant and size
                management:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  Variants: <code className="text-primary-300">default</code>,{" "}
                  <code className="text-primary-300">secondary</code>,{" "}
                  <code className="text-primary-300">destructive</code>,{" "}
                  <code className="text-primary-300">destructive-icon</code>,{" "}
                  <code className="text-primary-300">destructive-outline</code>,{" "}
                  <code className="text-primary-300">confirm</code>,{" "}
                  <code className="text-primary-300">confirm-icon</code>,{" "}
                  <code className="text-primary-300">ghost</code>,{" "}
                  <code className="text-primary-300">link</code>
                </li>
                <li>
                  Sizes: <code className="text-primary-300">xs</code>,{" "}
                  <code className="text-primary-300">sm</code>,{" "}
                  <code className="text-primary-300">default</code>,{" "}
                  <code className="text-primary-300">lg</code>,{" "}
                  <code className="text-primary-300">icon-xs</code>,{" "}
                  <code className="text-primary-300">icon</code>,{" "}
                  <code className="text-primary-300">icon-sm</code>,{" "}
                  <code className="text-primary-300">icon-lg</code>
                </li>
                <li>
                  Icons are automatically sized based on button size and use{" "}
                  <code className="text-primary-300">[&_svg]:size-4</code> by default
                </li>
                <li>
                  Supports <code className="text-primary-300">asChild</code> prop for composition
                  with Radix UI components
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
