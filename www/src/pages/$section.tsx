import type { ReactNode } from "react";
import { useOutletContext, useParams } from "react-router";
// UI Components
import { AlertDialogShowcase } from "../branding/alert-dialog-showcase";
import { AvatarShowcase } from "../branding/avatar-showcase";
import { BadgeShowcase } from "../branding/badge-showcase";
// Design System
import { BorderRadius } from "../branding/border-radius";
import { ButtonShowcase } from "../branding/button-showcase";
import { CardShowcase } from "../branding/card-showcase";
import { CheckboxShowcase } from "../branding/checkbox-showcase";
import { ColorPalette } from "../branding/color-palette";
import { ContentViewerShowcase } from "../branding/content-viewer-showcase";
import { DialogShowcase } from "../branding/dialog-showcase";
import { DropdownMenuShowcase } from "../branding/dropdown-menu-showcase";
import { InputShowcase } from "../branding/input-showcase";
import { PillButtonShowcase } from "../branding/pill-button-showcase";
import { PopoverShowcase } from "../branding/popover-showcase";
import { SelectShowcase } from "../branding/select-showcase";
import { SeparatorShowcase } from "../branding/separator-showcase";
import { Shadows } from "../branding/shadows";
import { SkeletonShowcase } from "../branding/skeleton-showcase";
import { SpacingScale } from "../branding/spacing-scale";
import { StepperShowcase } from "../branding/stepper-showcase";
import { SwitchShowcase } from "../branding/switch-showcase";
import { TableShowcase } from "../branding/table-showcase";
import { TextareaShowcase } from "../branding/textarea-showcase";
import { ThemeToggle } from "../branding/theme-toggle";
import { ToastShowcase } from "../branding/toast-showcase";
import { TooltipShowcase } from "../branding/tooltip-showcase";
import { Typography } from "../branding/typography";

type BrandingContext = { theme: "light" | "dark"; toggleTheme: () => void };

const SECTION_MAP: Record<string, (ctx?: BrandingContext) => ReactNode> = {
  // Design System
  theme: (ctx) => (ctx ? <ThemeToggle theme={ctx.theme} onToggle={ctx.toggleTheme} /> : null),
  "color-palette": () => <ColorPalette />,
  typography: () => <Typography />,
  spacing: () => <SpacingScale />,
  "border-radius": () => <BorderRadius />,
  shadows: () => <Shadows />,

  // UI Components
  button: () => <ButtonShowcase />,
  "pill-button": () => <PillButtonShowcase />,
  input: () => <InputShowcase />,
  card: () => <CardShowcase />,
  badge: () => <BadgeShowcase />,
  skeleton: () => <SkeletonShowcase />,
  separator: () => <SeparatorShowcase />,
  table: () => <TableShowcase />,
  tooltip: () => <TooltipShowcase />,
  popover: () => <PopoverShowcase />,
  dialog: () => <DialogShowcase />,
  "alert-dialog": () => <AlertDialogShowcase />,
  "dropdown-menu": () => <DropdownMenuShowcase />,
  select: () => <SelectShowcase />,
  textarea: () => <TextareaShowcase />,
  checkbox: () => <CheckboxShowcase />,
  switch: () => <SwitchShowcase />,
  toast: () => <ToastShowcase />,
  avatar: () => <AvatarShowcase />,
  stepper: () => <StepperShowcase />,
  "content-viewer": () => <ContentViewerShowcase />,
};

const VALID_SECTIONS = new Set(Object.keys(SECTION_MAP));

export default function BrandingSection() {
  const { section } = useParams<"section">();
  const context = useOutletContext<BrandingContext>();

  if (!section || !VALID_SECTIONS.has(section as keyof typeof SECTION_MAP)) {
    return (
      <div className="text-muted-foreground">Unknown section. Use the sidebar to navigate.</div>
    );
  }

  const render = SECTION_MAP[section];
  const content = section === "theme" && context ? render(context) : render();

  return <>{content}</>;
}
