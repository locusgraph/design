/**
 * ContentViewer Showcase
 * Demonstrates the ContentViewer component with plain text and JSON content
 */

import { ContentViewer } from "@locus/components";

const plainTextContent = `This is a simple plain text content.
It can span multiple lines and will be displayed as-is.
No special formatting is applied.`;

const jsonContent = JSON.stringify(
  {
    id: "locus_123",
    kind: "HighValue",
    metadata: {
      confidence: 0.95,
      created_at: "2024-01-15T10:30:00Z",
      tags: ["important", "verified", "user-generated"],
    },
    content: {
      title: "Example Locus",
      description: "This is a sample locus with nested JSON data",
      properties: {
        isActive: true,
        count: 42,
        nullValue: null,
      },
    },
    links: [
      { to: "locus_456", type: "DerivedFrom" },
      { to: "locus_789", type: "RelatedTo" },
    ],
  },
  null,
  2,
);

const simpleJsonContent = JSON.stringify({
  name: "Simple Object",
  value: 100,
  active: true,
});

export function ContentViewerShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">Plain Text Content</h3>
        <ContentViewer content={plainTextContent} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Simple JSON Content</h3>
        <ContentViewer content={simpleJsonContent} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Complex JSON Content</h3>
        <ContentViewer content={jsonContent} />
      </div>
    </div>
  );
}
