import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { CollectionsListWrapper } from "@/components/modules/collections/CollectionList";
import { CollectionTypes } from "@/types";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "Blog",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar breadcrumbs={breadcrumbs}>
        <CollectionsListWrapper collection={CollectionTypes.BLOG} />
      </AppSidebar>
    </SidebarProvider>
  );
}
