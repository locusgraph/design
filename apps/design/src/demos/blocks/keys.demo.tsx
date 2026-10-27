import { Keys, KeysEmpty } from "@locusgraph/blocks";
import { Button, RuleGrid, RuleGridCell } from "@locusgraph/components";
import { useState } from "react";
import { defineDemo, toggle } from "../../registry/define-demo";

const keys = [
  {
    id: "key_1",
    name: "production worker",
    maskedKey: "lg_live_…a1b2",
    productLabel: "LocusGraph",
    createdBy: "You",
    createdAt: "2026-10-01T00:00:00.000Z",
    expiresAt: null,
  },
  {
    id: "key_2",
    name: "nightly report",
    maskedKey: "sg_live_…9f3c",
    productLabel: "SpendGraph",
    createdBy: "Dana Rivera",
    createdAt: "2026-09-12T00:00:00.000Z",
    expiresAt: "2027-01-01T00:00:00.000Z",
  },
];

function DataActions() {
  const [lastAction, setLastAction] = useState<string>();
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <RuleGrid columns={1}>
        <RuleGridCell className="p-0">
          <Keys
            keys={keys}
            actions={[
              { id: "rotate", label: "Rotate" },
              { id: "revoke", label: "Revoke", variant: "destructive" },
            ]}
            onAction={(actionId, key) => setLastAction(`onAction("${actionId}", ${key.name})`)}
          />
        </RuleGridCell>
      </RuleGrid>
      <p className="font-mono text-2xs text-muted-foreground">{lastAction ?? "Click an action"}</p>
    </div>
  );
}

function ReadOnlyEmpty() {
  return (
    <div className="w-full max-w-2xl">
      <KeysEmpty />
    </div>
  );
}

export default defineDemo({
  title: "Keys",
  description:
    "Keys, the API key table, and KeysEmpty, its empty state. From `@locusgraph/blocks`.",
  controls: { empty: toggle(false) },
  playground: ({ empty }) => (
    <div className="w-full max-w-3xl">
      {empty ? (
        <KeysEmpty newKeyHref="#new-key" />
      ) : (
        <RuleGrid columns={1}>
          <RuleGridCell className="p-0">
            <Keys
              keys={keys}
              actions={(key) => (
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label={`Revoke ${key.name}`}
                  className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  Revoke
                </Button>
              )}
            />
          </RuleGridCell>
        </RuleGrid>
      )}
    </div>
  ),
  code: ({ empty }) =>
    empty
      ? `<KeysEmpty newKeyHref="/keys/new" linkComponent={Link} />`
      : `<Keys\n  keys={keys}\n  actions={(key) => <RevokeButton keyId={key.id} />}\n/>`,
  props: [
    { name: "Keys.keys", type: "ApiKeyRow[]" },
    { name: "Keys.actions", type: "((key: ApiKeyRow) => ReactNode) | BlockAction[]" },
    { name: "Keys.onAction", type: "(actionId: string, key: ApiKeyRow) => void" },
    {
      name: "Keys.pending",
      type: "{ actionId, target }",
      defaultValue: "locks every action, spinner on the key whose id is target",
    },
    {
      name: "Keys.settled",
      type: "{ actionId, target, label }",
      defaultValue: "shows label on target, locks the rest",
    },
    { name: "Keys.highlightedId", type: "string", defaultValue: "flashes a just-created key" },
    { name: "KeysEmpty.newKeyHref", type: "string", defaultValue: "omit for read-only roles" },
  ],
  examples: {
    DataActions: {
      description:
        "`actions` as data with one `onAction(actionId, key)`, so a model can write them as JSON.",
      component: DataActions,
    },
    ReadOnlyEmpty: {
      description: "Without `newKeyHref`, it tells the viewer to ask an owner.",
      component: ReadOnlyEmpty,
    },
  },
  isNew: true,
});
