import type { PageSection } from "@locusgraph/components";
import { DocLink, GuideArticle, GuideCode, GuideSection, Prose } from "../guide-layout";

export const humanInTheLoopSections: PageSection[] = [
  { id: "when-to-ask", title: "When to ask" },
  { id: "ask-for-one-call", title: "Ask for one call" },
  { id: "gate-every-call", title: "Gate every call" },
  { id: "keep-a-record", title: "Keep a record" },
  { id: "watch-the-cost", title: "Watch the cost" },
  { id: "oversee-a-run", title: "Oversee a run" },
];

const gateCode = `const gate = useApprovalGate({ by: user.name });

async function sendInvoice(input: SendInvoiceInput) {
  const decision = await gate.ask({
    toolName: "send_invoice",
    input,
    risk: "write",
    actionLabel: \`Send \${input.invoice}\`,
  });
  if (!decision.approved) return { denied: decision.reason };
  return invoices.send(input);
}

<ApprovalGate gate={gate} />
<DecisionLog entries={gate.log} />`;

export function HumanInTheLoopPage() {
  return (
    <GuideArticle
      title="Human in the loop"
      lead="Agents ask before they act. This guide takes you from one approval to a whole run a person can oversee, using the Loop parts in order."
    >
      <GuideSection id="when-to-ask" title="When to ask">
        <Prose>
          <p>Every tool call carries a risk level. It decides whether the agent waits.</p>
          <ul>
            <li>
              <code>read</code>: runs without asking. Show it in the thread so people can follow.
            </li>
            <li>
              <code>write</code>: waits for approval. Changes data someone can still fix.
            </li>
            <li>
              <code>destructive</code>: waits every time, even after Allow for this run. Deletes,
              sends money or cannot be undone.
            </li>
          </ul>
        </Prose>
      </GuideSection>
      <GuideSection id="ask-for-one-call" title="Ask for one call">
        <Prose>
          <p>
            <DocLink href="/loop/approval/approval">Approval</DocLink> shows one waiting tool call:
            what it does, its inputs and the change it will make, with approve and deny. Let people
            fix inputs first with <DocLink href="/loop/approval/args-editor">Args Editor</DocLink>,
            review a multi-step plan with{" "}
            <DocLink href="/loop/approval/plan-review">Plan Review</DocLink>, or answer the agent
            with <DocLink href="/loop/approval/question">Question</DocLink>.
          </p>
        </Prose>
      </GuideSection>
      <GuideSection id="gate-every-call" title="Gate every call">
        <Prose>
          <p>
            <DocLink href="/loop/approval/approval-gate">Approval Gate</DocLink> turns approval into
            a promise your tool code awaits. Allow for this run skips later asks for the same
            non-destructive tool.
          </p>
        </Prose>
        <GuideCode code={gateCode} />
      </GuideSection>
      <GuideSection id="keep-a-record" title="Keep a record">
        <Prose>
          <p>
            <DocLink href="/loop/oversight/decision-log">Decision Log</DocLink> lists every approve,
            deny, spend and stop with who decided, when and why. The gate fills{" "}
            <code>gate.log</code> for you; store it with the run.
          </p>
        </Prose>
      </GuideSection>
      <GuideSection id="watch-the-cost" title="Watch the cost">
        <Prose>
          <p>
            <DocLink href="/loop/oversight/spend-gate">Spend Gate</DocLink> pauses before a step
            that would pass the cost cap or the prepaid balance: allow once, raise the cap or stop.
            The cap check is your code, before each step.
          </p>
        </Prose>
      </GuideSection>
      <GuideSection id="oversee-a-run" title="Oversee a run">
        <Prose>
          <p>
            <DocLink href="/loop/oversight/run-bar">Run Bar</DocLink> shows a live run with pause
            and stop. <DocLink href="/loop/oversight/inbox">Inbox</DocLink> collects waiting
            approvals in one list, and{" "}
            <DocLink href="/loop/oversight/memory-review">Memory Review</DocLink> lets people keep,
            edit or discard what an agent wants to remember.
          </p>
        </Prose>
      </GuideSection>
    </GuideArticle>
  );
}
