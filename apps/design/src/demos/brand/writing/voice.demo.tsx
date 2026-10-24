import { Alert, AlertDescription, AlertTitle, Button } from "@locusgraph/components";
import { WarningCircle as CircleAlert } from "@phosphor-icons/react/ssr";
import { defineDemo, select } from "../../../registry/define-demo";
import { RulePair, voiceViews } from "./voice/rule-pair";
import { voiceRules } from "./voice/voice-rules";

function DeleteConfirmation() {
  return (
    <div className="flex w-[26rem] max-w-full flex-col gap-4 p-6 ring-1 ring-border">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading text-lg font-semibold">Delete 3 nodes?</h3>
        <p className="text-sm text-muted-foreground">
          They are removed from acme-customers for every agent. You cannot undo this.
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Keep nodes</Button>
        <Button variant="destructive">Delete 3 nodes</Button>
      </div>
    </div>
  );
}

function PaymentError() {
  return (
    <div className="w-[26rem] max-w-full">
      <Alert variant="destructive">
        <CircleAlert weight="bold" aria-hidden />
        <AlertTitle>Card declined</AlertTitle>
        <AlertDescription>
          Paid usage stops on Nov 1. Use a different card or ask your bank to allow the charge.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default defineDemo({
  title: "Voice",
  description:
    "How LocusGraph writes product copy: plain, calm and specific. Each rule shows the copy we use and the copy we do not, in a real button or alert.",
  controls: { view: select(voiceViews, "pairs") },
  playground: ({ view }) => (
    <div className="w-full max-w-4xl divide-y ring-1 ring-border">
      {voiceRules.map((rule) => (
        <RulePair key={rule.rule} rule={rule} view={view} />
      ))}
    </div>
  ),
  code: () =>
    [
      '<Button variant="destructive">Delete 3 nodes</Button>',
      "<AlertTitle>Card declined</AlertTitle>",
      "<AlertDescription>Use a different card or ask your bank.</AlertDescription>",
    ].join("\n"),
  props: [],
  examples: {
    DeleteConfirmation: {
      description:
        "Title asks the question, body says what happens, the button repeats the action and the count.",
      component: DeleteConfirmation,
    },
    PaymentError: {
      description: "An error names the problem, what it affects, and what to do next.",
      component: PaymentError,
    },
  },
  isNew: true,
});
