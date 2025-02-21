import { AppSidebar } from "@/components/app-sidebar";
import { CollectionsListWrapper } from "@/components/modules/collections/CollectionList";
import { BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { SidebarProvider } from "@/components/ui/sidebar";

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
