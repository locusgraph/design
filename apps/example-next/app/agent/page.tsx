import { AgentChat } from "@/components/agent/agent-chat";
import { PageHeading } from "@/components/page-heading";

export default function AgentPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <PageHeading
        meta="@locusgraph/agent-ui"
        title="Agent"
        description="A scripted run. Reads run on their own; the archive waits for your approval."
      />
      <AgentChat />
    </div>
  );
}
