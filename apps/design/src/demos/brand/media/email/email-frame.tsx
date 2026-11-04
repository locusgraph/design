import { emailAssetsOrigin, type RenderedEmail, renderEmail } from "@locusgraph/email";
import type { ReactElement, SyntheticEvent } from "react";

function fitFrameToEmail(event: SyntheticEvent<HTMLIFrameElement>) {
  const frame = event.currentTarget;
  frame.style.height = "0px";
  const emailHeight = frame.contentDocument?.documentElement.scrollHeight;
  if (emailHeight) frame.style.height = `${emailHeight}px`;
}

const placeholderHeight = 560;

function withLocalAssets(html: string) {
  if (typeof window === "undefined") return html;
  return html.replaceAll(emailAssetsOrigin, window.location.origin);
}

export function EmailFrame({ email }: { email: RenderedEmail }) {
  return (
    <section className="flex w-[40rem] max-w-full flex-col ring-1 ring-border">
      <div className="flex flex-col gap-0.5 border-b px-4 py-3">
        <span className="locus-eyebrow">Subject</span>
        <span className="text-sm font-medium">{email.subject}</span>
      </div>
      <iframe
        title={email.subject}
        srcDoc={withLocalAssets(email.html)}
        className="w-full bg-white"
        style={{ height: placeholderHeight }}
        onLoad={fitFrameToEmail}
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

type KitPreviewProps = { subject: string; children: ReactElement };

export function KitPreview({ subject, children }: KitPreviewProps) {
  return <EmailFrame email={renderEmail(subject, children)} />;
}
