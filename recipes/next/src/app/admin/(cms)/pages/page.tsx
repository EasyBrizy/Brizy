import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { CollectionsListWrapper } from "@/components/modules/collections/CollectionList";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "Pages",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar breadcrumbs={breadcrumbs}>
        <CollectionsListWrapper collection="page" />
      </AppSidebar>
    </SidebarProvider>
  );
}
