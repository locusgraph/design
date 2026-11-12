import { Waitlist, WaitlistForm } from "@locusgraph/marketing";
import { defineDemo, select } from "../../../registry/define-demo";

const outcomes = ["success", "error"] as const;

function wait(milliseconds: number) {
  return new Promise((resolve) => globalThis.setTimeout(resolve, milliseconds));
}

function joinWith(outcome: (typeof outcomes)[number]) {
  return async () => {
    await wait(900);
    return outcome === "error" ? { error: "That email is already on the list." } : undefined;
  };
}

function FormOnly() {
  return (
    <WaitlistForm
      onSubmit={joinWith("success")}
      buttonLabel="Get updates"
      note="One email a month. Unsubscribe any time."
    />
  );
}

export default defineDemo({
  title: "Waitlist",
  description:
    "An email field with submit, loading, success and error states. It calls your `onSubmit(email)` and never talks to an email provider itself; in Next.js pass a server action.",
  controls: { outcome: select(outcomes, "success") },
  playground: ({ outcome }) => (
    <Waitlist
      key={outcome}
      eyebrow="Early access"
      title="Join the waitlist"
      description="We're letting teams in every week."
      note="No spam. One email when it's your turn."
      onSubmit={joinWith(outcome)}
    />
  ),
  code: () => `async function join(email: string) {
  "use server";
  const added = await addToList(email);
  return added ? undefined : { error: "That email is already on the list." };
}

<Waitlist title="Join the waitlist" onSubmit={join} />`,
  props: [
    {
      name: "onSubmit",
      type: "(email: string) => Promise<{ error?: string } | void>",
      defaultValue: "throwing shows errorText",
    },
    { name: "buttonLabel", type: "string", defaultValue: '"Join the waitlist"' },
    { name: "placeholder", type: "string", defaultValue: '"you@company.com"' },
    { name: "emailLabel", type: "string", defaultValue: '"Email", for screen readers' },
    { name: "successText", type: "ReactNode" },
    { name: "errorText", type: "string", defaultValue: "shown when onSubmit throws" },
    { name: "note", type: "ReactNode", defaultValue: "small print under the field" },
    { name: "eyebrow, title, description", type: "ReactNode", defaultValue: "Waitlist only" },
  ],
  examples: {
    FormOnly: {
      description: "`WaitlistForm` on its own, for a hero or a footer.",
      component: FormOnly,
    },
  },
  isNew: true,
});
