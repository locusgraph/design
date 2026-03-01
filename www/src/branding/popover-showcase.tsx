import { ChevronsUpDown, Settings } from "lucide-react";
import { Button } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Input } from "@locus/components";
import { Label } from "@locus/components";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@locus/components";

export function PopoverShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Popover</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for small forms, filters, or additional info</p>
          <p>• Stays open until explicitly closed or clicked outside</p>
          <p>
            • Include <strong>PopoverClose</strong> for clear dismissal
          </p>
          <p>
            • Default width is <code>w-72</code>, adjust as needed
          </p>
          <p className="pt-2 text-xs">
            For simple confirmations use AlertDialog. For large forms use Dialog.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ghost Popover Trigger</CardTitle>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="min-w-[180px] justify-between rounded-sm">
                <span className="flex items-center gap-2">
                  <Settings className="size-4 shrink-0" aria-hidden />
                  <span>Settings</span>
                </span>
                <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground opacity-60" aria-hidden />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverClose />
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-sm text-muted-foreground">Popover content.</p>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Popover</CardTitle>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverClose />
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Popover Title</h4>
                <p className="text-sm text-muted-foreground">This is the popover content.</p>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popover with Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button>Edit Settings</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <PopoverClose />
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input id="width" defaultValue="100%" className="col-span-2" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" defaultValue="25px" className="col-span-2" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Positions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Top</Button>
            </PopoverTrigger>
            <PopoverContent side="top">
              <p className="text-sm">Popover on top</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Bottom</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom">
              <p className="text-sm">Popover on bottom</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Left</Button>
            </PopoverTrigger>
            <PopoverContent side="left">
              <p className="text-sm">Popover on left</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Right</Button>
            </PopoverTrigger>
            <PopoverContent side="right">
              <p className="text-sm">Popover on right</p>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </section>
  );
}
