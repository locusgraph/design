import { type RenderedEmail, renderEmail } from "@locusgraph/email";
import type { ReactElement } from "react";

type EmailFrameProps = { email: RenderedEmail; height?: number };

export function EmailFrame({ email, height = 560 }: EmailFrameProps) {
  return (
    <section className="flex w-[40rem] max-w-full flex-col ring-1 ring-border">
      <div className="flex flex-col gap-0.5 border-b px-4 py-3">
        <span className="locus-eyebrow">Subject</span>
        <span className="text-sm font-medium">{email.subject}</span>
      </div>
      <iframe
        title={email.subject}
        srcDoc={email.html}
        className="w-full bg-white"
        style={{ height }}
      />
    </section>
  );
}

export function PlainTextPart({ email }: { email: RenderedEmail }) {
  return (
    <section className="flex w-[40rem] max-w-full flex-col ring-1 ring-border">
      <span className="locus-eyebrow border-b px-4 py-3">Plain text part</span>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-xs whitespace-pre-wrap text-muted-foreground">
        {email.text}
      </pre>
    </section>
  );
}

type KitPreviewProps = { subject: string; height?: number; children: ReactElement };

export function KitPreview({ subject, height, children }: KitPreviewProps) {
  return <EmailFrame email={renderEmail(subject, children)} height={height} />;
}
