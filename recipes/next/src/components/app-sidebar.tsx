"use client";

import { BookOpen, CircleAlert, LayoutPanelTop, LifeBuoy, Settings2, SquareTerminal } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Breadcrumbs, BreadcrumbsItems } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Guest",
    email: "me@brizy.io",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Website",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Pages",
          url: "/admin/pages",
        },
        {
          title: "Blog",
          url: "/admin/blogs",
        },
        {
          title: "Stories",
          url: "/admin/stories",
        },
        {
          title: "Products",
          url: "/admin/products",
        },
      ],
    },
    {
      title: "Template",
      url: "#",
      icon: LayoutPanelTop,
      items: [
        {
          title: "Menu",
          url: "/admin/menu",
        },
      ],
    },
    {
      title: "Utilities",
      url: "#",
      icon: CircleAlert,
      items: [
        {
          title: "Popup",
          url: "/admin/popups",
        },
        {
          title: "Leads",
          url: "/admin/leads",
        },
      ],
    },
  ],
  navSettings: [
    {
      title: "Project Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "SEO",
          url: "/admin/settings/seo",
        },
        {
          title: "Sharing",
          url: "/admin/settings/sharing",
        },
        {
          title: "Custom Code",
          url: "/admin/settings/code",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "https://support.brizy.io/hc/en-us/categories/11455555357585-Brizy-Local",
      icon: LifeBuoy,
    },
    {
      title: "Documentation",
      url: "https://builder-docs.brizy.io/docs/developer-docs/the-docs-website",
      icon: BookOpen,
    },
  ],
};

const Sidebar = (props: ComponentProps<typeof SidebarComponent>) => (
  <SidebarComponent collapsible="icon" {...props}>
    <SidebarHeader>
      <TeamSwitcher />
    </SidebarHeader>
    <SidebarContent>
      <NavMain items={data.navMain} title="Platform" />
      <NavMain items={data.navSettings} title="Settings" />
      <NavSecondary items={data.navSecondary} className="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser user={data.user} />
    </SidebarFooter>
    <SidebarRail />
  </SidebarComponent>
);

interface Props {
  breadcrumbs?: BreadcrumbsItems[];
  children?: ReactNode;
}

export function AppSidebar({ breadcrumbs, children }: Props) {
  return (
    <>
      <Sidebar collapsible="icon" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumbs?.length && <Breadcrumbs items={breadcrumbs} />}
          </div>
        </header>
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </SidebarInset>
    </>
  );
}
