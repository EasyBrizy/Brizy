import { AppSidebar } from "~/components/app-sidebar";
import { RestrictedProAccess } from "~/components/restricted-pro-access";
import { BreadcrumbsItems } from "~/components/ui/breadcrumb";
import { SidebarProvider } from "~/components/ui/sidebar";
import { DEMO_POPUP } from "~/constants/demoLinks";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "Popups",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar breadcrumbs={breadcrumbs}>
        <RestrictedProAccess url={DEMO_POPUP} />
      </AppSidebar>
    </SidebarProvider>
  );
}
