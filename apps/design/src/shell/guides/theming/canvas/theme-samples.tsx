import type * as React from "react";
import { BillingPage } from "../../../../patterns/pages/billing-page";
import { ChatPage } from "../../../../patterns/pages/chat-page";
import { SettingsPage } from "../../../../patterns/pages/settings-page";
import { ComponentsSample } from "./components-sample";

export type ThemeSample = { id: string; label: string; render: () => React.ReactNode };

export const themeSamples: ThemeSample[] = [
  { id: "components", label: "Components", render: () => <ComponentsSample /> },
  { id: "settings", label: "Settings", render: () => <SettingsPage /> },
  { id: "billing", label: "Billing", render: () => <BillingPage /> },
  { id: "chat", label: "Chat", render: () => <ChatPage className="h-[36rem]" /> },
];

export function findThemeSample(id: string) {
  return themeSamples.find((sample) => sample.id === id) ?? themeSamples[0];
}
