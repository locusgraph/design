import { Alert, AlertDescription, AlertTitle, Button } from "@locusgraph/components";
import {
  WarningCircle as CircleAlert,
  CheckCircle as CircleCheck,
} from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";

export type VoiceRule = {
  rule: string;
  why: string;
  good: { copy: string; example: ReactNode };
  bad: { copy: string; example: ReactNode };
};

function Notice({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Alert variant="success">
      <CircleCheck weight="bold" aria-hidden />
      <AlertTitle className="line-clamp-none">{title}</AlertTitle>
      {children && <AlertDescription>{children}</AlertDescription>}
    </Alert>
  );
}

function ErrorNotice({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Alert variant="destructive">
      <CircleAlert weight="bold" aria-hidden />
      <AlertTitle className="line-clamp-none">{title}</AlertTitle>
      {children && <AlertDescription>{children}</AlertDescription>}
    </Alert>
  );
}

export const voiceRules: VoiceRule[] = [
  {
    rule: "Use plain words",
    why: "Say it the way you would say it to a colleague.",
    good: { copy: "Key deleted", example: <Notice title="Key deleted" /> },
    bad: {
      copy: "Credential successfully deprovisioned",
      example: <Notice title="Credential successfully deprovisioned" />,
    },
  },
  {
    rule: "Write in sentence case",
    why: "Capitalize the first word and names only.",
    good: { copy: "Create API key", example: <Button size="sm">Create API key</Button> },
    bad: { copy: "Create API Key", example: <Button size="sm">Create API Key</Button> },
  },
  {
    rule: "Name buttons by their action",
    why: "The button says what it does, with the count when there is one.",
    good: {
      copy: "Delete 3 nodes",
      example: (
        <Button size="sm" variant="destructive">
          Delete 3 nodes
        </Button>
      ),
    },
    bad: {
      copy: "Confirm",
      example: (
        <Button size="sm" variant="destructive">
          Confirm
        </Button>
      ),
    },
  },
  {
    rule: "Say what happens next",
    why: "Tell people what to expect after the action, not that it worked.",
    good: {
      copy: "Invitation sent. Dana gets an email with a link that works for 7 days.",
      example: (
        <Notice title="Invitation sent">
          Dana gets an email with a link that works for 7 days.
        </Notice>
      ),
    },
    bad: { copy: "Success", example: <Notice title="Success" /> },
  },
  {
    rule: "Write numbers as numerals",
    why: "Numerals scan faster and line up in tables.",
    good: {
      copy: "Remove 3 members",
      example: (
        <Button size="sm" variant="outline">
          Remove 3 members
        </Button>
      ),
    },
    bad: {
      copy: "Remove three members",
      example: (
        <Button size="sm" variant="outline">
          Remove three members
        </Button>
      ),
    },
  },
  {
    rule: "No exclamation marks",
    why: "Calm copy reads as confident. Good news does not need shouting.",
    good: { copy: "Plan upgraded to Pro", example: <Notice title="Plan upgraded to Pro" /> },
    bad: { copy: "Woohoo! You're on Pro!", example: <Notice title="Woohoo! You're on Pro!" /> },
  },
  {
    rule: "Errors say what to do",
    why: "Name the problem, then the next step.",
    good: {
      copy: "Card declined. Use a different card or ask your bank.",
      example: (
        <ErrorNotice title="Card declined">Use a different card or ask your bank.</ErrorNotice>
      ),
    },
    bad: {
      copy: "Error 402: payment failed",
      example: <ErrorNotice title="Error 402: payment failed" />,
    },
  },
  {
    rule: "Keep labels short",
    why: "Two or three words. Cut please, click here and now.",
    good: { copy: "Buy credits", example: <Button size="sm">Buy credits</Button> },
    bad: {
      copy: "Click here to buy credits",
      example: <Button size="sm">Click here to buy credits</Button>,
    },
  },
];
