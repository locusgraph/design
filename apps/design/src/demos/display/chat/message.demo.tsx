import {
  Avatar,
  AvatarFallback,
  Bubble,
  BubbleContent,
  BubbleGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

function UserAvatar() {
  return (
    <Avatar>
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
  );
}

function AgentAvatar() {
  return (
    <Avatar>
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  );
}

function Conversation() {
  return (
    <MessageGroup className="w-full max-w-sm gap-6">
      <Message align="end">
        <MessageAvatar>
          <UserAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>Why did our bill go up this month?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <AgentAvatar />
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>You added 4 seats on March 12.</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>That adds $76, prorated to $52 for March.</BubbleContent>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}

function HeaderAndFooter() {
  return (
    <MessageGroup className="w-full max-w-sm gap-6">
      <Message>
        <MessageContent>
          <MessageHeader>Billing agent</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>Invoice INV-0042 was paid.</BubbleContent>
          </Bubble>
          <MessageFooter>10:42 AM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Great, send me the receipt.</BubbleContent>
          </Bubble>
          <MessageFooter>Read</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}

function AgentReply() {
  return (
    <Message className="w-full max-w-md">
      <MessageContent>
        <MessageHeader>Locus agent</MessageHeader>
        <Bubble variant="ghost">
          <BubbleContent>
            Usage for the acme org is 82,400 of 100,000 agent runs. At the current rate you reach
            the limit on March 27.
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}

export default defineDemo({
  title: "Message",
  isNew: true,
  description:
    "Lays out one chat turn: an avatar, bubbles, and an optional header and footer. Align end for the current user.",
  controls: {
    align: select(["start", "end"]),
    avatar: toggle(true),
    footer: toggle(true),
  },
  playground: ({ align, avatar, footer }) => (
    <Message align={align} className="w-80">
      {avatar && (
        <MessageAvatar>{align === "end" ? <UserAvatar /> : <AgentAvatar />}</MessageAvatar>
      )}
      <MessageContent>
        <Bubble variant={align === "end" ? "default" : "muted"}>
          <BubbleContent>Your API key was created.</BubbleContent>
        </Bubble>
        {footer && <MessageFooter>Just now</MessageFooter>}
      </MessageContent>
    </Message>
  ),
  code: ({ align, avatar, footer }) =>
    `<Message${formatProp("align", align, "start")}>${avatar ? `\n  <MessageAvatar>\n    <Avatar>\n      <AvatarFallback>AI</AvatarFallback>\n    </Avatar>\n  </MessageAvatar>` : ""}\n  <MessageContent>\n    <Bubble>\n      <BubbleContent>Your API key was created.</BubbleContent>\n    </Bubble>${footer ? "\n    <MessageFooter>Just now</MessageFooter>" : ""}\n  </MessageContent>\n</Message>`,
  props: [
    { name: "align", type: "start | end", defaultValue: "start" },
    { name: "MessageGroup", type: 'ComponentProps<"div">' },
    { name: "MessageAvatar", type: 'ComponentProps<"div">' },
    { name: "MessageHeader / MessageFooter", type: 'ComponentProps<"div">' },
  ],
  examples: {
    Conversation: {
      description: "A user question and a grouped agent reply with avatars.",
      component: Conversation,
    },
    HeaderAndFooter: {
      description: "A header names the sender and a footer shows time or status.",
      component: HeaderAndFooter,
    },
    AgentReply: {
      description: "A ghost bubble suits long agent answers without a background.",
      component: AgentReply,
    },
  },
  composition: {
    name: "MessageGroup",
    children: [
      {
        name: "Message",
        children: [
          { name: "MessageAvatar" },
          {
            name: "MessageContent",
            children: [{ name: "MessageHeader" }, { name: "Bubble" }, { name: "MessageFooter" }],
          },
        ],
      },
    ],
  },
});
