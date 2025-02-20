import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { RestrictedProAccess } from "@/components/restricted-pro-access";
import { DEMO_HEADER } from "@/constants/demoLinks";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "Headers",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar breadcrumbs={breadcrumbs}>
        <RestrictedProAccess url={DEMO_HEADER} />
      </AppSidebar>
    </SidebarProvider>
  );
}
