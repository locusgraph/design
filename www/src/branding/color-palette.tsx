import { Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

/** 8 Hyperbola color scales – all steps 50 to 950 */
const scaleSteps = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;
type ScaleStep = (typeof scaleSteps)[number];
type ScaleName = "primary" | "destructive" | "confirm" | "notice" | "hnt";
const colorScales: { name: string; prefix: ScaleName }[] = [
  { name: "Primary", prefix: "primary" },
  { name: "Destructive", prefix: "destructive" },
  { name: "Confirm", prefix: "confirm" },
  { name: "Notice", prefix: "notice" },
  { name: "HNT", prefix: "hnt" },
];

const scaleBgClasses: Record<ScaleName, Record<ScaleStep, string>> = {
  primary: {
    50: "bg-primary",
    100: "bg-primary-100",
    200: "bg-primary-200",
    300: "bg-primary-300",
    400: "bg-primary-400",
    500: "bg-primary-500",
    600: "bg-primary-600",
    700: "bg-primary-700",
    800: "bg-primary-800",
    900: "bg-primary-900",
    950: "bg-primary-foreground",
  },
  destructive: {
    50: "bg-destructive",
    100: "bg-destructive-100",
    200: "bg-destructive-200",
    300: "bg-destructive-300",
    400: "bg-destructive-400",
    500: "bg-destructive-500",
    600: "bg-destructive-600",
    700: "bg-destructive-700",
    800: "bg-destructive-800",
    900: "bg-destructive-900",
    950: "bg-destructive-foreground",
  },
  confirm: {
    50: "bg-confirm",
    100: "bg-confirm-100",
    200: "bg-confirm-200",
    300: "bg-confirm-300",
    400: "bg-confirm-400",
    500: "bg-confirm-500",
    600: "bg-confirm-600",
    700: "bg-confirm-700",
    800: "bg-confirm-800",
    900: "bg-confirm-900",
    950: "bg-confirm-foreground",
  },
  notice: {
    50: "bg-notice",
    100: "bg-notice-100",
    200: "bg-notice-200",
    300: "bg-notice-300",
    400: "bg-notice-400",
    500: "bg-notice-500",
    600: "bg-notice-600",
    700: "bg-notice-700",
    800: "bg-notice-800",
    900: "bg-notice-900",
    950: "bg-notice-foreground",
  },
  hnt: {
    50: "bg-hnt",
    100: "bg-hnt-100",
    200: "bg-hnt-200",
    300: "bg-hnt-300",
    400: "bg-hnt-400",
    500: "bg-hnt-500",
    600: "bg-hnt-600",
    700: "bg-hnt-700",
    800: "bg-hnt-800",
    900: "bg-hnt-900",
    950: "bg-hnt-foreground",
  },
};

/** Light steps: dark text; dark steps: light text */
const stepTextClass: Record<ScaleStep, string> = {
  50: "text-primary-900",
  100: "text-primary-900",
  200: "text-primary-900",
  300: "text-primary-900",
  400: "text-primary-900",
  500: "text-primary-50",
  600: "text-primary-50",
  700: "text-primary-50",
  800: "text-primary-50",
  900: "text-primary-50",
  950: "text-primary-50",
};

export function ColorPalette() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Color Palette</h2>
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
            • Scale from <strong>50</strong> (lightest) to <strong>950</strong>{" "}
            (darkest)
          </p>
          <p>
            • Color families: <code>primary</code>, <code>destructive</code>,{" "}
            <code>confirm</code>, <code>notice</code>, <code>hnt</code>
          </p>
          <p>
            • Light shades (50-400) for backgrounds, dark shades (600-950) for
            text
          </p>
          <p>
            • <strong>500</strong> is the base color for each scale
          </p>
          <p className="pt-2 text-xs">
            Use semantic tokens (e.g., text-foreground) for automatic theme
            adaptation.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Color Scales (50 → 950)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <div className="space-y-3">
                {colorScales.map((scale) => (
                  <div
                    key={scale.prefix}
                    className="flex items-stretch gap-3 min-w-0"
                  >
                    <div className="w-36 shrink-0 pt-2 text-sm font-medium">
                      {scale.name}
                    </div>
                    <div className="flex flex-1 min-w-0 overflow-hidden rounded border">
                      {scaleSteps.map((step) => (
                        <div
                          key={step}
                          className={`flex-1 min-w-0 h-12 ${scaleBgClasses[scale.prefix][step]} ${stepTextClass[step]} flex items-center justify-center text-xs font-mono`}
                          title={`${scale.prefix}-${step}`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
