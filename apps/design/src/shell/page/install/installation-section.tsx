import { Tabs, TabsContent, TabsList, TabsTrigger } from "@locusgraph/components";
import { useRegistryItem } from "../sections/use-registry-items";
import { PackageManagerSwitch } from "./install-parts";
import { useRegistryTree } from "./registry-tree";
import { ManualTab } from "./tabs/manual-tab";
import { PackageTab, pagePackages } from "./tabs/package-tab";
import { ShadcnTab } from "./tabs/shadcn-tab";

type InstallationSectionProps = {
  registryName: string;
  libraryPackage: string;
  importLine: string;
};

const tabContentClass = "p-4 sm:p-5";

export function InstallationSection({
  registryName,
  libraryPackage,
  importLine,
}: InstallationSectionProps) {
  const inRegistry = useRegistryItem(registryName);
  const tree = useRegistryTree(registryName);
  const packageTab = <PackageTab packages={pagePackages(libraryPackage, importLine)} />;
  return (
    <section id="installation" className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
      <div className="bg-card ring-1 ring-border">
        {inRegistry ? (
          <Tabs defaultValue="package" className="gap-0">
            <div className="flex items-end justify-between gap-3 border-b border-line pr-3">
              <TabsList
                variant="line"
                className="justify-start px-3 pt-1 group-data-[orientation=horizontal]/tabs:border-b-0"
              >
                <TabsTrigger value="package" className="flex-none">
                  Package
                </TabsTrigger>
                <TabsTrigger value="shadcn" className="flex-none">
                  shadcn
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex-none">
                  Manual
                </TabsTrigger>
              </TabsList>
              <div className="pb-1.5">
                <PackageManagerSwitch />
              </div>
            </div>
            <TabsContent value="package" className={tabContentClass}>
              {packageTab}
            </TabsContent>
            <TabsContent value="shadcn" className={tabContentClass}>
              <ShadcnTab registryName={registryName} tree={tree} />
            </TabsContent>
            <TabsContent value="manual" className={tabContentClass}>
              <ManualTab tree={tree} />
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-1.5 sm:px-5">
              <span className="locus-eyebrow">npm</span>
              <PackageManagerSwitch />
            </div>
            <div className={tabContentClass}>{packageTab}</div>
          </>
        )}
      </div>
    </section>
  );
}
