import { Check, ChevronDown, MoreHorizontal, Trash, User } from "lucide-react";
import { Button } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@locus/components";

export function DropdownMenuShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Dropdown Menu</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for row actions and contextual menus</p>
          <p>
            • Group related items with <strong>Separator</strong>
          </p>
          <p>
            • Use <strong>Label</strong> for section headers
          </p>
          <p>• Destructive items should be at the bottom with red text</p>
          <p className="pt-2 text-xs">
            Include icons for clarity. Use align="end" for right-aligned triggers.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Actions
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="mr-2 size-4" />
                Mark Complete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive-500">
                <Trash className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Icon Button Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Checkbox Items</CardTitle>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Filter
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Show</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Pending</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </section>
  );
}
