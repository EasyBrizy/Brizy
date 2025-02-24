import { AppSidebar } from "~/components/app-sidebar";
import { CodeForm } from "~/components/modules/settings/code/form";
import { ProjectSettingsProvider } from "~/components/modules/settings/core/System";
import { BreadcrumbsItems } from "~/components/ui/breadcrumb";
import { SidebarProvider } from "~/components/ui/sidebar";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "Code",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <ProjectSettingsProvider>
        <AppSidebar breadcrumbs={breadcrumbs}>
          <CodeForm />
        </AppSidebar>
      </ProjectSettingsProvider>
    </SidebarProvider>
  );
}
