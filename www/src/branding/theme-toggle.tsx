import { Moon, Sun } from "lucide-react";
import { Button } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Sun className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Theme</h2>
      </div>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • Theme controlled by <code>dark</code> class on <code>html</code> element
          </p>
          <p>
            • Semantic tokens adapt automatically: <code>bg-background</code>,{" "}
            <code>text-foreground</code>
          </p>
          <p>
            • Variables defined in <code>css/variables/light.css</code> and <code>dark.css</code>
          </p>
          <p>• All components adapt without additional styling</p>
          <p className="pt-2 text-xs">Always use semantic tokens instead of hardcoded colors.</p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme Toggle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Current theme: <span className="font-medium text-foreground">{theme}</span>
              </p>
              <Button onClick={onToggle} variant="secondary">
                {theme === "light" ? (
                  <>
                    <Moon className="size-4" />
                    Switch to Dark Mode
                  </>
                ) : (
                  <>
                    <Sun className="size-4" />
                    Switch to Light Mode
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 p-4 border rounded-md bg-background">
                <div className="flex items-center gap-2">
                  <Sun className="size-4 text-primary" />
                  <h3 className="font-semibold">Light Theme</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Light backgrounds with dark text for optimal readability in bright environments.
                </p>
              </div>
              <div className="space-y-2 p-4 border rounded-md bg-background">
                <div className="flex items-center gap-2">
                  <Moon className="size-4 text-primary" />
                  <h3 className="font-semibold">Dark Theme</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dark backgrounds with light text to reduce eye strain in low-light conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
