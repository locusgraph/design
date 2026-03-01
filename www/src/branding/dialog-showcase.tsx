import { Button } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@locus/components";
import { Input } from "@locus/components";
import { Label } from "@locus/components";
import { Textarea } from "@locus/components";

export function DialogShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Dialog</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for forms, wizards, and focused tasks</p>
          <p>
            • Always include <strong>DialogTitle</strong> for accessibility
          </p>
          <p>
            • <strong>DialogDescription</strong> explains the purpose
          </p>
          <p>
            • <strong>DialogFooter</strong> contains action buttons (Cancel on left)
          </p>
          <p className="pt-2 text-xs">For destructive confirmations use AlertDialog instead.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Dialog</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a description of what the dialog is for.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Dialog content goes here. You can add any content you need.
              </p>
              <DialogFooter>
                <Button variant="secondary">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Form Dialog</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Graph</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Graph</DialogTitle>
                <DialogDescription>
                  Enter the details for your new knowledge graph.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="My Graph" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your graph..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary">Cancel</Button>
                <Button>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </section>
  );
}
