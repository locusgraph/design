import {
  AppHeader,
  AppShell,
  AppSidebar,
  Breadcrumbs,
  CommandHint,
  Separator,
  ThemeToggle,
} from "@locusgraph/components";
import {
  CreditCardIcon,
  FileTextIcon,
  GaugeIcon,
  KeyRoundIcon,
  LayoutGridIcon,
  UsersIcon,
} from "lucide-react";
import { BillingOverview } from "./content/billing-overview";
import { useShellTheme } from "./content/use-shell-theme";
import { defineShell } from "./define-shell";

const groups = [
  {
    label: "Workspace",
    items: [
      { title: "Overview", href: "#overview", icon: LayoutGridIcon },
      { title: "Members", href: "#members", icon: UsersIcon },
      { title: "API keys", href: "#keys", icon: KeyRoundIcon },
    ],
  },
  {
    label: "Billing",
    items: [
      { title: "Plan", href: "#billing", icon: CreditCardIcon },
      { title: "Invoices", href: "#invoices", icon: FileTextIcon },
      { title: "Usage", href: "#usage", icon: GaugeIcon },
    ],
  },
];

function AccountsShell() {
  const [theme, setTheme] = useShellTheme();
  return (
    <AppShell
      sidebar={
        <AppSidebar
          brand={{
            title: "locus",
            subtitle: "Accounts",
            icon: <span className="size-2.5 rotate-45 bg-foreground" />,
            href: "#overview",
          }}
          groups={groups}
          activeHref="#billing"
        />
      }
      header={
        <AppHeader
          breadcrumbs={
            <Breadcrumbs items={[{ label: "Billing", href: "#billing" }, { label: "Plan" }]} />
          }
        >
          <CommandHint />
          <Separator orientation="vertical" className="h-4" />
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
        </AppHeader>
      }
    >
      <div className="flex flex-col gap-1 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Plan and billing</h1>
        <p className="text-sm text-muted-foreground">Seats, usage and invoices for Acme Inc.</p>
      </div>
      <BillingOverview />
    </AppShell>
  );
}

export default defineShell({
  title: "App Shell",
  description:
    "Full-bleed sidebar on a hairline that collapses to icons, a header with breadcrumbs, and a ruled body. For the accounts app.",
  importLine: 'import { AppHeader, AppShell, AppSidebar } from "@locusgraph/components";',
  component: AccountsShell,
});
