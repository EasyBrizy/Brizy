import { AppSidebar } from "@/components/app-sidebar";
import { RestrictedProAccess } from "@/components/restricted-pro-access";
import { BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DEMO_MENU } from "@/constants/demoLinks";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "Menu",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar breadcrumbs={breadcrumbs}>
        <RestrictedProAccess url={DEMO_MENU} />
      </AppSidebar>
    </SidebarProvider>
  );
}
