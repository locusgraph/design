import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
} from "@locusgraph/components";
import { useForm } from "react-hook-form";
import { defineDemo, text, toggle } from "../../../registry/define-demo";

type BillingValues = { company: string; billingEmail: string };
type PlaygroundProps = { showDescription: boolean; submitLabel: string };
type InviteValues = { email: string; sendWelcome: boolean };

function PlaygroundForm({ showDescription, submitLabel }: PlaygroundProps) {
  const form = useForm<{ name: string }>({ defaultValues: { name: "" } });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => form.reset())} className="flex w-80 flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Organization name is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              {showDescription && <FormDescription>Shown on invoices.</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-start">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}

function BillingDetails() {
  const form = useForm<BillingValues>({ defaultValues: { company: "", billingEmail: "" } });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => form.reset())} className="flex w-80 flex-col gap-6">
        <FormField
          control={form.control}
          name="company"
          rules={{ minLength: { value: 2, message: "Use at least 2 characters." } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billingEmail"
          rules={{
            required: "Billing email is required.",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address." },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="billing@acme.com" {...field} />
              </FormControl>
              <FormDescription>Receipts and invoices are sent here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-start">
          Save billing details
        </Button>
      </form>
    </Form>
  );
}

function InviteMember() {
  const form = useForm<InviteValues>({
    defaultValues: { email: "", sendWelcome: true },
    mode: "onChange",
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => form.reset())} className="flex w-80 flex-col gap-6">
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Enter an email to invite." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="teammate@acme.com" {...field} />
              </FormControl>
              <FormDescription>Send invite turns on once an email is entered.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sendWelcome"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Send a welcome email</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid} className="self-start">
          Send invite
        </Button>
      </form>
    </Form>
  );
}

export default defineDemo({
  title: "Form",
  isNew: true,
  description:
    "Form wires `react-hook-form` into labels, controls and error messages. Each FormField validates with rules and shows its error under the control.",
  controls: {
    showDescription: toggle(true),
    submitLabel: text("Save"),
  },
  playground: ({ showDescription, submitLabel }) => (
    <PlaygroundForm showDescription={showDescription} submitLabel={submitLabel} />
  ),
  code: ({ showDescription, submitLabel }) =>
    `const form = useForm<{ name: string }>({ defaultValues: { name: "" } });\n\n<Form {...form}>\n  <form onSubmit={form.handleSubmit(onSubmit)}>\n    <FormField\n      control={form.control}\n      name="name"\n      rules={{ required: "Organization name is required." }}\n      render={({ field }) => (\n        <FormItem>\n          <FormLabel>Organization name</FormLabel>\n          <FormControl>\n            <Input placeholder="Acme Inc." {...field} />\n          </FormControl>\n${showDescription ? "          <FormDescription>Shown on invoices.</FormDescription>\n" : ""}          <FormMessage />\n        </FormItem>\n      )}\n    />\n    <Button type="submit">${submitLabel}</Button>\n  </form>\n</Form>`,
  props: [
    { name: "Form", type: "FormProvider, spread the useForm() result" },
    { name: "FormField.control", type: "Control<TFieldValues>" },
    { name: "FormField.name", type: "FieldPath<TFieldValues>" },
    { name: "FormField.rules", type: "RegisterOptions" },
    { name: "FormField.render", type: "({ field, fieldState }) => ReactElement" },
    { name: "FormMessage.children", type: "ReactNode, replaced by the field error" },
  ],
  examples: {
    BillingDetails: {
      description: "Length, required and pattern rules show their messages after submit.",
      component: BillingDetails,
    },
    InviteMember: {
      description: "A switch bound to a field, and a submit button enabled once the form is valid.",
      component: InviteMember,
    },
  },
  composition: {
    name: "Form",
    children: [
      {
        name: "FormField",
        children: [
          {
            name: "FormItem",
            children: [
              { name: "FormLabel" },
              { name: "FormControl" },
              { name: "FormDescription" },
              { name: "FormMessage" },
            ],
          },
        ],
      },
    ],
  },
});
