import {
  AlertTriangle,
  Bell,
  Check,
  ChevronDown,
  Layout,
  MoreHorizontal,
  Trash,
  User,
} from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@locus/components";
import { Avatar, AvatarFallback, AvatarImage } from "@locus/components";
import { Badge } from "@locus/components";
import { Button } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import { Checkbox } from "@locus/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@locus/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@locus/components";
import { Input } from "@locus/components";
import { Label } from "@locus/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@locus/components";
import { Separator } from "@locus/components";
import { Skeleton } from "@locus/components";
import { Switch } from "@locus/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@locus/components";
import { Textarea } from "@locus/components";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@locus/components";

export function ComponentPlaceholders() {
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-2">
        <Layout className="size-5 text-primary" />
        <h2 className="text-2xl font-semibold">UI Components</h2>
      </div>

      {/* Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Skeleton</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>

      {/* Badge */}
      <Card>
        <CardHeader>
          <CardTitle>Badge</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="confirm">Confirm</Badge>
          <Badge variant="notice">Notice</Badge>
          <Badge variant="outline">Outline</Badge>
        </CardContent>
      </Card>

      {/* Separator */}
      <Card>
        <CardHeader>
          <CardTitle>Separator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Horizontal</p>
            <Separator className="my-2" />
            <p className="text-sm text-muted-foreground">Content below</p>
          </div>
          <div className="flex h-8 items-center gap-4">
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Right</span>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Agent Alpha</TableCell>
                <TableCell>
                  <Badge variant="confirm">Active</Badge>
                </TableCell>
                <TableCell>Owner</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Agent Beta</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell>Reader</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Agent Gamma</TableCell>
                <TableCell>
                  <Badge variant="destructive">Revoked</Badge>
                </TableCell>
                <TableCell>Writer</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tooltip */}
      <Card>
        <CardHeader>
          <CardTitle>Tooltip</CardTitle>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>
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
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Dialog</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
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

      {/* AlertDialog */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Dialog</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="size-4" />
                Delete Graph
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your graph and all
                  associated locuses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive-800 text-destructive-100 hover:bg-destructive-500">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* DropdownMenu */}
      <Card>
        <CardHeader>
          <CardTitle>Dropdown Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <MoreHorizontal className="size-4" />
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

      {/* Select */}
      <Card>
        <CardHeader>
          <CardTitle>Select</CardTitle>
        </CardHeader>
        <CardContent className="max-w-xs">
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

      {/* Textarea */}
      <Card>
        <CardHeader>
          <CardTitle>Textarea</CardTitle>
        </CardHeader>
        <CardContent className="max-w-md">
          <Textarea placeholder="Enter a description for your graph..." />
        </CardContent>
      </Card>

      {/* Checkbox */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Checkbox id="terms" checked={checked} onCheckedChange={(c) => setChecked(!!c)} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </CardContent>
      </Card>

      {/* Switch */}
      <Card>
        <CardHeader>
          <CardTitle>Switch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Switch id="notifications" checked={switchOn} onCheckedChange={setSwitchOn} />
            <Label htmlFor="notifications">Enable notifications</Label>
            <Badge variant={switchOn ? "confirm" : "secondary"}>{switchOn ? "On" : "Off"}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">SM</AvatarFallback>
            </Avatar>
            <Avatar className="size-14">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      {/* Toast Note */}
      <Card>
        <CardHeader>
          <CardTitle>Toast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 rounded-md border border-notice-700 bg-notice-900 p-4 text-notice-100">
            <AlertTriangle className="size-4" />
            <span className="text-sm">
              Toast requires a Toaster provider at root. See toast.tsx for usage.
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
