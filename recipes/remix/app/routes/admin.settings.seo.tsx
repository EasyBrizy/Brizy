import { AppSidebar } from "~/components/app-sidebar";
import { ProjectSettingsProvider } from "~/components/modules/settings/core/System";
import { SeoForm } from "~/components/modules/settings/seo/form";
import { BreadcrumbsItems } from "~/components/ui/breadcrumb";
import { SidebarProvider } from "~/components/ui/sidebar";

const breadcrumbs: BreadcrumbsItems[] = [
  {
    name: "Dashboard",
    url: "/admin",
  },
  {
    name: "SEO",
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <ProjectSettingsProvider>
        <AppSidebar breadcrumbs={breadcrumbs}>
          <SeoForm />
        </AppSidebar>
      </ProjectSettingsProvider>
    </SidebarProvider>
  );
}
