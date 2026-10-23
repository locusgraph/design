import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Alert, AlertTitle } from "../alert";

describe("Alert", () => {
  it("announces only destructive alerts as urgent", () => {
    const urgent = renderToStaticMarkup(
      <Alert variant="destructive">
        <AlertTitle>Payment failed</AlertTitle>
      </Alert>
    );
    const calm = renderToStaticMarkup(
      <Alert variant="warning">
        <AlertTitle>Credits are low</AlertTitle>
      </Alert>
    );
    expect(urgent).toContain('role="alert"');
    expect(calm).toContain('role="status"');
  });

  it("lets the caller override the role", () => {
    const html = renderToStaticMarkup(<Alert role="note">Read only</Alert>);
    expect(html).toContain('role="note"');
  });
});
