import { Keys, KeysEmpty } from "@locusgraph/blocks";
import { Button, RuleGrid, RuleGridCell } from "@locusgraph/components";
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

function ReadOnlyEmpty() {
  return (
    <div className="w-full max-w-2xl">
      <KeysEmpty />
    </div>
  );
}

export default defineDemo({
  title: "Keys",
  description: "Keys, the API key table, and KeysEmpty, its empty state. From @locusgraph/blocks.",
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
              actions={() => (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive"
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
      : `<Keys keys={keys} actions={(key) => <RevokeButton keyId={key.id} />} />`,
  props: [
    { name: "Keys.keys", type: "ApiKeyRow[]" },
    { name: "Keys.actions", type: "(key: ApiKeyRow) => ReactNode" },
    { name: "Keys.highlightedId", type: "string", defaultValue: "flashes a just-created key" },
    { name: "KeysEmpty.newKeyHref", type: "string", defaultValue: "omit for read-only roles" },
  ],
  examples: {
    ReadOnlyEmpty: {
      description: "Without newKeyHref, it tells the viewer to ask an owner.",
      component: ReadOnlyEmpty,
    },
  },
  isNew: true,
});
