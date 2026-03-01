import { useState } from "react";
import { Badge } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Label } from "@locus/components";
import { Switch } from "@locus/components";

export function SwitchShowcase() {
  const [enabled, setEnabled] = useState(false);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Switch</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for on/off settings that take effect immediately</p>
          <p>• Provide clear labels describing the setting</p>
          <p>• On state uses primary color</p>
          <p>• Works well in settings lists with descriptions</p>
          <p className="pt-2 text-xs">
            For form submissions that need a save action, use Checkbox instead.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Switch id="notifications" checked={enabled} onCheckedChange={setEnabled} />
            <Label htmlFor="notifications">Enable notifications</Label>
            <Badge variant={enabled ? "confirm" : "secondary"}>{enabled ? "On" : "Off"}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>States</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch id="off" />
            <Label htmlFor="off">Off</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="on" defaultChecked />
            <Label htmlFor="on">On</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="disabled-off" disabled />
            <Label htmlFor="disabled-off" className="opacity-50">
              Disabled Off
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="disabled-on" disabled defaultChecked />
            <Label htmlFor="disabled-on" className="opacity-50">
              Disabled On
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-xs text-muted-foreground">Use dark theme</p>
            </div>
            <Switch id="dark-mode" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-save">Auto Save</Label>
              <p className="text-xs text-muted-foreground">Automatically save changes</p>
            </div>
            <Switch id="auto-save" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analytics">Analytics</Label>
              <p className="text-xs text-muted-foreground">Share anonymous usage data</p>
            </div>
            <Switch id="analytics" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
