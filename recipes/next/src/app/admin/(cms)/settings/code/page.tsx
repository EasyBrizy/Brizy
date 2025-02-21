"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ProjectSettingsProvider } from "@/components/modules/settings/core/System";
import { BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CodeForm } from "./form";

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
