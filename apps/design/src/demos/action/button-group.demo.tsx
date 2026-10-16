import {
  ChevronDown as ChevronDownIcon,
  Copy as CopyIcon,
  Subtract as MinusIcon,
  Add as PlusIcon,
  Renew as RefreshCwIcon,
} from "@carbon/icons-react";
import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Input,
} from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select } from "../../registry/define-demo";

const orientations = ["horizontal", "vertical"] as const;

function SplitButton() {
  return (
    <ButtonGroup>
      <Button>Upgrade plan</Button>
      <ButtonGroupSeparator />
      <Button size="icon" aria-label="More plans">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  );
}

function SeatStepper() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Remove seat">
        <MinusIcon />
      </Button>
      <ButtonGroupText>12 seats</ButtonGroupText>
      <Button variant="outline" size="icon" aria-label="Add seat">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
}

function WithInput() {
  return (
    <ButtonGroup className="w-80">
      <Input readOnly value="lg_live_4f9a2c81" aria-label="API key" />
      <Button variant="outline" size="icon" aria-label="Copy key">
        <CopyIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Rotate key">
        <RefreshCwIcon />
      </Button>
    </ButtonGroup>
  );
}

function Nested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Invoices</Button>
        <Button variant="outline">Usage</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Export</Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}

export default defineDemo({
  title: "Button Group",
  isNew: true,
  description:
    "Joins related buttons into one control. Use it for split buttons, steppers and toolbars that act on the same thing.",
  controls: { orientation: select(orientations) },
  playground: ({ orientation }) => (
    <ButtonGroup orientation={orientation}>
      <Button variant="outline">Monthly</Button>
      <Button variant="outline">Quarterly</Button>
      <Button variant="outline">Yearly</Button>
    </ButtonGroup>
  ),
  code: ({ orientation }) =>
    `<ButtonGroup${formatProp("orientation", orientation, "horizontal")}>\n  <Button variant="outline">Monthly</Button>\n  <Button variant="outline">Quarterly</Button>\n  <Button variant="outline">Yearly</Button>\n</ButtonGroup>`,
  props: [
    { name: "orientation", type: orientations.join(" | "), defaultValue: "horizontal" },
    { name: "ButtonGroupText.asChild", type: "boolean", defaultValue: "false" },
    {
      name: "ButtonGroupSeparator.orientation",
      type: "horizontal | vertical",
      defaultValue: "vertical",
    },
    { name: "...props", type: 'ComponentProps<"div">' },
  ],
  examples: {
    SplitButton: {
      description: "A main action with a menu trigger beside it.",
      component: SplitButton,
    },
    SeatStepper: {
      description: "Text between two buttons makes a stepper.",
      component: SeatStepper,
    },
    WithInput: {
      description: "An input joined with the actions that work on it.",
      component: WithInput,
    },
    Nested: {
      description: "Nested groups keep a gap between each cluster.",
      component: Nested,
    },
  },
  composition: {
    name: "ButtonGroup",
    children: [
      { name: "Button" },
      { name: "ButtonGroupSeparator" },
      { name: "ButtonGroupText" },
      { name: "Button" },
    ],
  },
});
