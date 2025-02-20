"use client";

import { BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SharingForm } from "./form";
import { ProjectSettingsProvider } from "@/components/modules/settings/core/System";

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
