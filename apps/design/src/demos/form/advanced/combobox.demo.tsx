import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@locusgraph/components";
import { Fragment } from "react";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, text, toggle } from "../../../registry/define-demo";

const members = [
  "Ada Lovelace",
  "Grace Hopper",
  "Alan Turing",
  "Katherine Johnson",
  "Linus Torvalds",
] as const;

const scopes = [
  "usage:read",
  "usage:write",
  "billing:read",
  "members:read",
  "keys:manage",
] as const;

const regions = [
  { value: "Americas", items: ["us-east", "us-west", "sa-east"] },
  { value: "Europe", items: ["eu-west", "eu-central"] },
  { value: "Asia Pacific", items: ["ap-south", "ap-northeast"] },
] as const;

function MultipleScopes() {
  const anchor = useComboboxAnchor();
  return (
    <Combobox multiple autoHighlight items={scopes} defaultValue={[scopes[0]]}>
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: string[]) => (
            <Fragment>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Add scope" />
            </Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No scopes found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function GroupedRegions() {
  return (
    <Combobox items={regions}>
      <ComboboxInput placeholder="Select a data region" />
      <ComboboxContent>
        <ComboboxEmpty>No regions found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof regions)[number], index: number) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < regions.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function WithClear() {
  return (
    <Combobox items={members} defaultValue={members[1]}>
      <ComboboxInput placeholder="Assign an owner" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No members found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default defineDemo({
  title: "Combobox",
  isNew: true,
  previewHeight: "tall",
  description:
    "A text field that filters a list as you type. Use it to find a member, pick API key scopes or choose a region.",
  controls: {
    placeholder: text("Search members"),
    showClear: toggle(),
    autoHighlight: toggle(),
    disabled: toggle(),
  },
  playground: ({ placeholder, showClear, autoHighlight, disabled }) => (
    <Combobox items={members} autoHighlight={autoHighlight} disabled={disabled}>
      <ComboboxInput placeholder={placeholder} showClear={showClear} disabled={disabled} />
      <ComboboxContent>
        <ComboboxEmpty>No members found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
  code: ({ placeholder, showClear, autoHighlight, disabled }) =>
    `<Combobox items={members}${formatProp("autoHighlight", autoHighlight, false)}${formatProp("disabled", disabled, false)}>\n  <ComboboxInput placeholder="${placeholder}"${formatProp("showClear", showClear, false)}${formatProp("disabled", disabled, false)} />\n  <ComboboxContent>\n    <ComboboxEmpty>No members found.</ComboboxEmpty>\n    <ComboboxList>\n      {(item) => (\n        <ComboboxItem key={item} value={item}>\n          {item}\n        </ComboboxItem>\n      )}\n    </ComboboxList>\n  </ComboboxContent>\n</Combobox>`,
  props: [
    { name: "items", type: "readonly Item[]" },
    { name: "value / onValueChange", type: "controlled selected item" },
    { name: "defaultValue", type: "Item | Item[]" },
    { name: "multiple", type: "boolean", defaultValue: "false" },
    { name: "autoHighlight", type: "boolean", defaultValue: "false" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
    { name: "ComboboxInput.showTrigger", type: "boolean", defaultValue: "true" },
    { name: "ComboboxInput.showClear", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    MultipleScopes: {
      description: "multiple with chips picks several scopes for an API key.",
      component: MultipleScopes,
    },
    GroupedRegions: {
      description: "Groups with labels and separators organize data regions.",
      component: GroupedRegions,
    },
    WithClear: {
      description: "showClear adds a button that removes the current choice.",
      component: WithClear,
    },
  },
  composition: {
    name: "Combobox",
    children: [
      { name: "ComboboxInput" },
      {
        name: "ComboboxContent",
        children: [
          { name: "ComboboxEmpty" },
          { name: "ComboboxList", children: [{ name: "ComboboxItem" }] },
        ],
      },
    ],
  },
});
