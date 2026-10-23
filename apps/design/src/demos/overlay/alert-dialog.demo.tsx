import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@locusgraph/components";
import { Key as KeyRoundIcon } from "@phosphor-icons/react/ssr";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../registry/define-demo";

const sizes = ["default", "sm"] as const;

function RevokeKey({
  title,
  size,
  open,
}: {
  title: string;
  size: (typeof sizes)[number];
  open?: boolean;
}) {
  return (
    <AlertDialog key={String(open)} defaultOpen={open}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Revoke key</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            Requests signed with this key start failing right away. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="destructive">Revoke</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CancelSubscription() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Cancel plan</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel the Team plan?</AlertDialogTitle>
          <AlertDialogDescription>
            Your organization keeps its seats until the end of the billing period.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="destructive">Cancel plan</AlertDialogAction>
          <AlertDialogCancel>Keep plan</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function WithMedia() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Rotate key</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <KeyRoundIcon weight="bold" aria-hidden />
          </AlertDialogMedia>
          <AlertDialogTitle>Rotate API key?</AlertDialogTitle>
          <AlertDialogDescription>The old key stops working in 24 hours.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Rotate</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default defineDemo({
  title: "Alert Dialog",
  description:
    "A modal that interrupts the user to confirm an action with consequences. It does not close when the overlay is clicked.",
  controls: { open: toggle(), size: select(sizes), title: text("Revoke this API key?") },
  playground: ({ open, size, title }) => <RevokeKey title={title} size={size} open={open} />,
  code: ({ size, title }) =>
    `<AlertDialog>\n  <AlertDialogTrigger asChild>\n    <Button variant="outline">Revoke key</Button>\n  </AlertDialogTrigger>\n  <AlertDialogContent${formatProp("size", size, "default")}>\n    <AlertDialogHeader>\n      <AlertDialogTitle>${title}</AlertDialogTitle>\n      <AlertDialogDescription>\n        Requests signed with this key start failing right away. This cannot be undone.\n      </AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogAction variant="destructive">Revoke</AlertDialogAction>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`,
  props: [
    { name: "open", type: "boolean" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
    { name: "onOpenChange", type: "(open: boolean) => void" },
    { name: "AlertDialogContent.size", type: "default | sm", defaultValue: "default" },
    { name: "AlertDialogAction.variant", type: "Button variant", defaultValue: "default" },
    { name: "AlertDialogCancel.variant", type: "Button variant", defaultValue: "outline" },
  ],
  examples: {
    CancelSubscription: {
      description: "Confirm a plan cancellation, with keeping the plan as the safe choice.",
      component: CancelSubscription,
    },
    WithMedia: {
      description: "A small dialog with an icon above the title.",
      component: WithMedia,
    },
  },
  composition: {
    name: "AlertDialog",
    children: [
      { name: "AlertDialogTrigger" },
      {
        name: "AlertDialogContent",
        children: [
          {
            name: "AlertDialogHeader",
            children: [
              { name: "AlertDialogMedia" },
              { name: "AlertDialogTitle" },
              { name: "AlertDialogDescription" },
            ],
          },
          {
            name: "AlertDialogFooter",
            children: [{ name: "AlertDialogAction" }, { name: "AlertDialogCancel" }],
          },
        ],
      },
    ],
  },
  previewHeight: "tall",
});
