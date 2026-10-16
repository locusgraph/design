import { EmailPreviews } from "@/components/email-previews";
import { PageHeading } from "@/components/page-heading";

export default function EmailPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <PageHeading
        meta="@locusgraph/email"
        title="Emails"
        description="Previewed in the browser. Send the html and text from your backend, not from a Server Component."
      />
      <EmailPreviews />
    </div>
  );
}
