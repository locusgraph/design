"use client";

import { Button, Label, Switch } from "@locusgraph/components";
import { useId, useState } from "react";
import type { NotificationSetting } from "./settings-data";
import { SettingsSection } from "./settings-section";

type SettingsNotificationsProps = {
  notifications: NotificationSetting[];
  onSave: (notifications: NotificationSetting[]) => void;
};

function enabledIds(notifications: NotificationSetting[]) {
  return notifications
    .filter((notification) => notification.enabled)
    .map((notification) => notification.id)
    .join(",");
}

export function SettingsNotifications({ notifications, onSave }: SettingsNotificationsProps) {
  const fieldId = useId();
  const [saved, setSaved] = useState(notifications);
  const [draft, setDraft] = useState(notifications);
  const toggle = (id: string, enabled: boolean) =>
    setDraft((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, enabled } : notification
      )
    );
  const save = () => {
    setSaved(draft);
    onSave(draft);
  };
  return (
    <SettingsSection
      title="Notifications"
      description="Which emails the workspace sends, and to whom."
      footer={
        <Button size="sm" disabled={enabledIds(saved) === enabledIds(draft)} onClick={save}>
          Save
        </Button>
      }
    >
      <ul className="-my-3 flex flex-col divide-y divide-border">
        {draft.map((notification) => (
          <li key={notification.id} className="flex items-start justify-between gap-4 py-3">
            <div className="flex min-w-0 flex-col gap-0.5">
              <Label htmlFor={`${fieldId}-${notification.id}`}>{notification.label}</Label>
              <p
                id={`${fieldId}-${notification.id}-description`}
                className="text-sm text-muted-foreground"
              >
                {notification.description}
              </p>
            </div>
            <Switch
              id={`${fieldId}-${notification.id}`}
              aria-describedby={`${fieldId}-${notification.id}-description`}
              checked={notification.enabled}
              onCheckedChange={(enabled) => toggle(notification.id, enabled)}
            />
          </li>
        ))}
      </ul>
    </SettingsSection>
  );
}
