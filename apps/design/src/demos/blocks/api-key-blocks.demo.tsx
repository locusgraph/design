import { KeysTable, NoKeys } from "@locusgraph/blocks";
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
      <NoKeys />
    </div>
  );
}

export default defineDemo({
  title: "API Key Blocks",
  description: "The API-keys table and its empty state. From @locusgraph/blocks.",
  controls: { empty: toggle(false) },
  playground: ({ empty }) => (
    <div className="w-full max-w-3xl">
      {empty ? (
        <NoKeys newKeyHref="#new-key" />
      ) : (
        <RuleGrid columns={1}>
          <RuleGridCell className="p-0">
            <KeysTable
              keys={keys}
              actions={() => (
                <Button size="sm" variant="ghost">
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
      ? `<NoKeys newKeyHref="/keys/new" linkComponent={Link} />`
      : `<KeysTable keys={keys} actions={(key) => <RevokeButton keyId={key.id} />} />`,
  props: [
    { name: "KeysTable.keys", type: "ApiKeyRow[]" },
    { name: "KeysTable.actions", type: "(key: ApiKeyRow) => ReactNode" },
    { name: "NoKeys.newKeyHref", type: "string", defaultValue: "omit for read-only roles" },
  ],
  examples: {
    ReadOnlyEmpty: {
      description: "Without newKeyHref, it tells the viewer to ask an owner.",
      component: ReadOnlyEmpty,
    },
  },
  isNew: true,
});
