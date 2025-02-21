import { AppSidebar } from "@/components/app-sidebar";
import { RestrictedProAccess } from "@/components/restricted-pro-access";
import { BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DEMO_LEADS } from "@/constants/demoLinks";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "Leads",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar breadcrumbs={breadcrumbs}>
        <RestrictedProAccess url={DEMO_LEADS} />
      </AppSidebar>
    </SidebarProvider>
  );
}
