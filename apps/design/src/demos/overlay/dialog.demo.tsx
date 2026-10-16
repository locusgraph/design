import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@locusgraph/components";
import { defineDemo, text, toggle } from "../../registry/define-demo";

function RemoveMember({ title, open }: { title: string; open?: boolean }) {
  return (
    <Dialog key={String(open)} defaultOpen={open}>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>They lose access to this organization right away.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 pb-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ConfirmRemoval() {
  return <RemoveMember title="Remove member?" />;
}

export default defineDemo({
  title: "Dialog",
  description:
    "A modal window for a focused task or a confirmation. It traps focus and closes on Escape.",
  controls: { open: toggle(), title: text("Remove member?") },
  playground: ({ open, title }) => <RemoveMember title={title} open={open} />,
  code: ({ title }) =>
    `<Dialog>\n  <DialogTrigger asChild>\n    <Button variant="outline">Open dialog</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>${title}</DialogTitle>\n      <DialogDescription>They lose access to this organization right away.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose asChild>\n        <Button variant="outline">Cancel</Button>\n      </DialogClose>\n      <Button variant="destructive">Remove</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
  props: [
    { name: "open", type: "boolean" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
    { name: "onOpenChange", type: "(open: boolean) => void" },
    { name: "DialogContent.showCloseButton", type: "boolean", defaultValue: "true" },
  ],
  examples: {
    ConfirmRemoval: {
      description: "A destructive confirmation with a safe default.",
      component: ConfirmRemoval,
    },
  },
  composition: {
    name: "Dialog",
    children: [
      { name: "DialogTrigger" },
      {
        name: "DialogContent",
        children: [
          {
            name: "DialogHeader",
            children: [{ name: "DialogTitle" }, { name: "DialogDescription" }],
          },
          { name: "DialogFooter", children: [{ name: "DialogClose" }] },
        ],
      },
    ],
  },
  previewHeight: "tall",
});
