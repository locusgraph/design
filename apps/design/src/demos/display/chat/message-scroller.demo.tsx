import {
  Bubble,
  BubbleContent,
  Marker,
  MarkerContent,
  Message,
  MessageContent,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const scrollPositions = ["end", "start", "last-anchor"] as const;

const turns = [
  { id: "t1", role: "user", text: "Which members have not logged in this month?" },
  { id: "t2", role: "agent", text: "Three members: Dana, Omar and Lee. Each holds a paid seat." },
  { id: "t3", role: "user", text: "How much would we save by removing them?" },
  { id: "t4", role: "agent", text: "Three Pro seats at $19 each, so $57 a month from next cycle." },
  { id: "t5", role: "user", text: "Remove Lee and send Dana and Omar a reminder." },
  { id: "t6", role: "agent", text: "Done. Lee was removed and two reminder emails were sent." },
  { id: "t7", role: "user", text: "What is our usage forecast for agent runs?" },
  {
    id: "t8",
    role: "agent",
    text: "You have used 82,400 of 100,000 runs. At this rate you reach the limit on March 27, four days before renewal.",
  },
] as const;

function Thread() {
  return (
    <MessageScrollerContent className="p-4">
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      {turns.map((turn) => (
        <MessageScrollerItem key={turn.id} messageId={turn.id} scrollAnchor={turn.role === "user"}>
          <Message align={turn.role === "user" ? "end" : "start"}>
            <MessageContent>
              <Bubble variant={turn.role === "user" ? "default" : "muted"}>
                <BubbleContent>{turn.text}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageScrollerItem>
      ))}
    </MessageScrollerContent>
  );
}

function Basic() {
  return (
    <MessageScrollerProvider>
      <div className="h-96 w-full max-w-sm overflow-hidden border">
        <MessageScroller>
          <MessageScrollerViewport>
            <Thread />
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  );
}

function OpenAtStart() {
  return (
    <MessageScrollerProvider defaultScrollPosition="start">
      <div className="h-80 w-full max-w-sm overflow-hidden border">
        <MessageScroller>
          <MessageScrollerViewport>
            <Thread />
          </MessageScrollerViewport>
          <MessageScrollerButton direction="start" />
          <MessageScrollerButton />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  );
}

function LastAnchor() {
  return (
    <MessageScrollerProvider defaultScrollPosition="last-anchor">
      <div className="h-80 w-full max-w-sm overflow-hidden border">
        <MessageScroller>
          <MessageScrollerViewport>
            <Thread />
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  );
}

export default defineDemo({
  title: "Message Scroller",
  isNew: true,
  description:
    "A scroll area for chat threads that stays pinned to the newest message and anchors each new turn. A button jumps back to the end.",
  controls: {
    defaultScrollPosition: select(scrollPositions),
    autoScroll: toggle(true),
  },
  playground: ({ defaultScrollPosition, autoScroll }) => (
    <MessageScrollerProvider
      key={`${defaultScrollPosition}-${autoScroll}`}
      defaultScrollPosition={defaultScrollPosition}
      autoScroll={autoScroll}
    >
      <div className="h-96 w-80 overflow-hidden border">
        <MessageScroller>
          <MessageScrollerViewport>
            <Thread />
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  ),
  code: ({ defaultScrollPosition, autoScroll }) =>
    `<MessageScrollerProvider${formatProp("defaultScrollPosition", defaultScrollPosition, "end")}${autoScroll ? "" : " autoScroll={false}"}>\n  <MessageScroller>\n    <MessageScrollerViewport>\n      <MessageScrollerContent>\n        {turns.map((turn) => (\n          <MessageScrollerItem key={turn.id} messageId={turn.id} scrollAnchor={turn.role === "user"}>\n            <Message align={turn.role === "user" ? "end" : "start"}>\n              <MessageContent>\n                <Bubble>\n                  <BubbleContent>{turn.text}</BubbleContent>\n                </Bubble>\n              </MessageContent>\n            </Message>\n          </MessageScrollerItem>\n        ))}\n      </MessageScrollerContent>\n    </MessageScrollerViewport>\n    <MessageScrollerButton />\n  </MessageScroller>\n</MessageScrollerProvider>`,
  props: [
    {
      name: "Provider.defaultScrollPosition",
      type: scrollPositions.join(" | "),
      defaultValue: "end",
    },
    { name: "Provider.autoScroll", type: "boolean", defaultValue: "true" },
    { name: "Provider.scrollPreviousItemPeek", type: "number" },
    { name: "Item.scrollAnchor", type: "boolean", defaultValue: "false" },
    { name: "Button.direction", type: "start | end", defaultValue: "end" },
  ],
  examples: {
    Basic: {
      description: "Opens at the newest message with a jump-to-end button.",
      component: Basic,
    },
    OpenAtStart: {
      description: "Opens at the top, with buttons for both directions.",
      component: OpenAtStart,
    },
    LastAnchor: {
      description: "Opens with the last user turn settled near the top.",
      component: LastAnchor,
    },
  },
  composition: {
    name: "MessageScrollerProvider",
    children: [
      {
        name: "MessageScroller",
        children: [
          {
            name: "MessageScrollerViewport",
            children: [
              { name: "MessageScrollerContent", children: [{ name: "MessageScrollerItem" }] },
            ],
          },
          { name: "MessageScrollerButton" },
        ],
      },
    ],
  },
  previewHeight: "tall",
});
