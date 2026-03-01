import { Bell, Info, Settings } from "lucide-react";
import { Button } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@locus/components";

export function TooltipShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Tooltip</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for icon-only buttons and truncated text</p>
          <p>• Keep content brief (1 line preferred)</p>
          <p>• Appears on hover with slight delay</p>
          <p>
            • Wrap app in <strong>TooltipProvider</strong> once at root
          </p>
          <p className="pt-2 text-xs">
            Don't put interactive content in tooltips. Use Popover instead.
          </p>
        </CardContent>
      </Card>

      <TooltipProvider>
        <Card>
          <CardHeader>
            <CardTitle>Basic Tooltip</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Icon Buttons with Tooltips</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Bell className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Settings className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Info className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More information</p>
              </TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Positions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Tooltip on top</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tooltip on bottom</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Tooltip on left</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tooltip on right</p>
              </TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>
      </TooltipProvider>
    </section>
  );
}
