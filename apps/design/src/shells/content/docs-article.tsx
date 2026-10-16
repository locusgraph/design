export const docsArticleSections = [
  { id: "overview", title: "Overview" },
  { id: "create-a-key", title: "Create a key" },
  { id: "scopes", title: "Scopes" },
  { id: "rotate", title: "Rotate a key", nested: true },
];

export function DocsArticle() {
  return (
    <article className="mx-auto flex w-full max-w-160 flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-tight">API keys</h1>
      <p className="text-muted-foreground">
        Create keys for agents and services, and limit what each key can do.
      </p>
      <div className="typeset typeset-docs mt-6">
        <h2 id="overview">Overview</h2>
        <p>
          Every request to the platform API carries a key. A key belongs to one organization and
          inherits the plan limits of that organization.
        </p>
        <h2 id="create-a-key">Create a key</h2>
        <p>
          Open API keys in the accounts app and choose New key. The key is shown once, so store it
          right away.
        </p>
        <pre>
          <code>curl -H "Authorization: Bearer $LOCUS_KEY" platform.locusgraph.com/v1/usage</code>
        </pre>
        <h2 id="scopes">Scopes</h2>
        <ul>
          <li>usage:read lets a key read usage totals.</li>
          <li>graphs:write lets a key write to graphs.</li>
          <li>billing:read lets a key read invoices.</li>
        </ul>
        <h3 id="rotate">Rotate a key</h3>
        <p>
          Create the new key first, deploy it, then revoke the old one. Revoked keys stop working at
          once.
        </p>
      </div>
    </article>
  );
}
