import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Checkbox } from "@locus/components";
import { Label } from "@locus/components";

export function CheckboxShowcase() {
  const [checked, setChecked] = useState(false);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Checkbox</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for boolean choices and multi-select lists</p>
          <p>
            • Always pair with a <strong>Label</strong> for accessibility
          </p>
          <p>• Checked state uses primary color</p>
          <p>• Supports indeterminate state for partial selection</p>
          <p className="pt-2 text-xs">
            For on/off toggles prefer Switch. For single selection use Radio.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Checkbox id="terms" checked={checked} onCheckedChange={(c) => setChecked(!!c)} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>States</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox id="unchecked" />
            <Label htmlFor="unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checked" defaultChecked />
            <Label htmlFor="checked">Checked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="opacity-50">
              Disabled
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <Label htmlFor="disabled-checked" className="opacity-50">
              Disabled Checked
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Checkbox Group</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox id="email-notifications" defaultChecked />
            <Label htmlFor="email-notifications">Email notifications</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="push-notifications" />
            <Label htmlFor="push-notifications">Push notifications</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="sms-notifications" />
            <Label htmlFor="sms-notifications">SMS notifications</Label>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
