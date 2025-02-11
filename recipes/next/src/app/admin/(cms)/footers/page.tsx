import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { RestrictedProAccess } from "@/components/restricted-pro-access";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "Footers",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar breadcrumbs={breadcrumbs}>
        <RestrictedProAccess url="https://vercel-marketing-page.vercel.app/admin/footers" />
      </AppSidebar>
    </SidebarProvider>
  );
}
