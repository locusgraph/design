import { Alert, AlertDescription, AlertTitle, Button } from "@locusgraph/components";
import {
  WarningCircle as AlertCircleIcon,
  Warning as AlertTriangleIcon,
  CheckCircle as CheckCircle2Icon,
  Info as InfoIcon,
} from "@phosphor-icons/react/ssr";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../../registry/define-demo";

const variants = ["destructive", "default", "success", "warning"] as const;

function Success() {
  return (
    <Alert variant="success" className="max-w-md">
      <CheckCircle2Icon weight="bold" aria-hidden />
      <AlertTitle>Plan upgraded</AlertTitle>
      <AlertDescription>Your organization is now on the Team plan.</AlertDescription>
    </Alert>
  );
}

function PaymentFailed() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon weight="bold" aria-hidden />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        <p>We could not charge the card ending in 4242.</p>
        <ul className="list-inside list-disc text-sm">
          <li>Check the card details</li>
          <li>Make sure the card has funds</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}

function TitleOnly() {
  return (
    <Alert className="max-w-md">
      <InfoIcon weight="bold" aria-hidden />
      <AlertTitle>Usage resets on the 1st of each month.</AlertTitle>
    </Alert>
  );
}

function WithAction() {
  return (
    <Alert variant="warning" className="max-w-md">
      <AlertTriangleIcon weight="bold" aria-hidden />
      <AlertTitle>You have used 90% of your API calls</AlertTitle>
      <AlertDescription>
        <p>Upgrade before the limit to avoid failed requests.</p>
        <Button size="sm" className="mt-2">
          Upgrade plan
        </Button>
      </AlertDescription>
    </Alert>
  );
}

export default defineDemo({
  title: "Alert",
  description:
    "A callout for a message the user should notice, like a failed payment or an approaching usage limit.",
  controls: {
    variant: select(variants),
    icon: toggle(true),
    title: text("Payment failed"),
  },
  playground: ({ variant, icon, title }) => (
    <Alert variant={variant} className="max-w-md">
      {icon ? <AlertCircleIcon weight="bold" aria-hidden /> : null}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>We could not charge the card ending in 4242.</AlertDescription>
    </Alert>
  ),
  code: ({ variant, icon, title }) =>
    `<Alert${formatProp("variant", variant, "default")}>${icon ? '\n  <AlertCircleIcon weight="bold" aria-hidden />' : ""}\n  <AlertTitle>${title}</AlertTitle>\n  <AlertDescription>We could not charge the card ending in 4242.</AlertDescription>\n</Alert>`,
  props: [
    { name: "variant", type: "default | success | warning | destructive", defaultValue: "default" },
    { name: "...props", type: 'ComponentProps<"div">' },
  ],
  examples: {
    Success: { description: "Confirms that a change went through.", component: Success },
    PaymentFailed: {
      description: "The destructive variant for an error, with a list of next steps.",
      component: PaymentFailed,
    },
    TitleOnly: { description: "A short note needs only a title.", component: TitleOnly },
    WithAction: {
      description: "A button in the description lets the user act right away.",
      component: WithAction,
    },
  },
  composition: {
    name: "Alert",
    children: [{ name: "Icon" }, { name: "AlertTitle" }, { name: "AlertDescription" }],
  },
});
