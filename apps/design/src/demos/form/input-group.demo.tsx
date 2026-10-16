import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@locusgraph/components";
import { CopyIcon, SearchIcon } from "lucide-react";
import { defineDemo, select, text, toggle } from "../../registry/define-demo";

const aligns = ["inline-start", "inline-end"] as const;

function Search() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Search members" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  );
}

function Price() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupAddon>
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="number" placeholder="0.00" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD / month</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}

function CopyKey() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput readOnly defaultValue="lg_live_4f9a2c7e1b" className="font-mono" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Copy API key">
          <CopyIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

function WithTextarea() {
  return (
    <InputGroup className="max-w-md">
      <InputGroupTextarea placeholder="Message to the account owner" />
      <InputGroupAddon align="block-end">
        <InputGroupText>0 / 500</InputGroupText>
        <InputGroupButton variant="default" size="sm" className="ml-auto">
          Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export default defineDemo({
  title: "Input Group",
  description:
    "An input with icons, text or buttons attached inside its border. Use it for search, prices and copyable values.",
  controls: {
    align: select(aligns),
    button: toggle(),
    placeholder: text("Search invoices"),
  },
  playground: ({ align, button, placeholder }) => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder={placeholder} />
      <InputGroupAddon align={align}>
        <SearchIcon />
      </InputGroupAddon>
      {button && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Search</InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  ),
  code: ({ align, button, placeholder }) => {
    const alignProp = align === "inline-start" ? "" : ` align="${align}"`;
    const buttonAddon = button
      ? '\n  <InputGroupAddon align="inline-end">\n    <InputGroupButton>Search</InputGroupButton>\n  </InputGroupAddon>'
      : "";
    return `<InputGroup>\n  <InputGroupInput placeholder="${placeholder}" />\n  <InputGroupAddon${alignProp}>\n    <SearchIcon />\n  </InputGroupAddon>${buttonAddon}\n</InputGroup>`;
  },
  props: [
    {
      name: "InputGroupAddon.align",
      type: "inline-start | inline-end | block-start | block-end",
      defaultValue: "inline-start",
    },
    { name: "InputGroupButton.size", type: "xs | sm | icon-xs | icon-sm", defaultValue: "xs" },
    { name: "InputGroupButton.variant", type: "Button variant", defaultValue: "ghost" },
    { name: "...props", type: 'ComponentProps<"div">' },
  ],
  examples: {
    Search: {
      description: "An icon before the input and a result count after it.",
      component: Search,
    },
    Price: {
      description: "Text addons show the currency and the billing period.",
      component: Price,
    },
    CopyKey: {
      description: "An icon button copies a read-only API key.",
      component: CopyKey,
    },
    WithTextarea: {
      description: "A block-end addon puts a counter and a button under a textarea.",
      component: WithTextarea,
    },
  },
  composition: {
    name: "InputGroup",
    children: [
      { name: "InputGroupInput" },
      { name: "InputGroupAddon", children: [{ name: "InputGroupText" }] },
      { name: "InputGroupAddon", children: [{ name: "InputGroupButton" }] },
    ],
  },
});
