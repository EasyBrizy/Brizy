import { AppSidebar } from "~/components/app-sidebar";
import { ProjectSettingsProvider } from "~/components/modules/settings/core/System";
import { SharingForm } from "~/components/modules/settings/sharing/form";
import { BreadcrumbsItems } from "~/components/ui/breadcrumb";
import { SidebarProvider } from "~/components/ui/sidebar";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "Sharing",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <ProjectSettingsProvider>
        <AppSidebar breadcrumbs={breadcrumbs}>
          <SharingForm />
        </AppSidebar>
      </ProjectSettingsProvider>
    </SidebarProvider>
  );
}
