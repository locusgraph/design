import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Label } from "@locus/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@locus/components";

export function SelectShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Select</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for single selection from predefined options</p>
          <p>
            • <strong>SelectValue</strong> shows placeholder when empty
          </p>
          <p>• Height matches Input for alignment in forms</p>
          <p>• Supports keyboard navigation and search</p>
          <p className="pt-2 text-xs">
            For multi-select use Checkbox group. For 2-3 options consider Radio buttons.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Select</CardTitle>
        </CardHeader>
        <CardContent className="max-w-xs">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Label</CardTitle>
        </CardHeader>
        <CardContent className="max-w-xs space-y-2">
          <Label>Permission Level</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select permission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="write">Write</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Default Value</CardTitle>
        </CardHeader>
        <CardContent className="max-w-xs">
          <Select defaultValue="write">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="write">Write</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disabled</CardTitle>
        </CardHeader>
        <CardContent className="max-w-xs">
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </section>
  );
}
