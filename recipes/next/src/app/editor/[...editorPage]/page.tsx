/**
 * This file implements a *magic* catch-all route that renders the Brizy editor.
 *
 * This route exposes /brizy/[...editorPage], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending in `/edit` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a Brizy editor.
 *
 * This approach enables public pages to be statically rendered whilst the /brizy route can
 * remain dynamic.
 *
 * NB this route is public, and you will need to add authentication
 */

import { Client } from "../client";
import { Metadata } from "next";
import { getPage } from "@/lib/getPage";
import { getProject } from "@/lib/getProject";
import { pageData, projectData } from "@/brizy.config";

export async function generateMetadata({ params }: { params: Promise<{ editorPage: string[] }> }): Promise<Metadata> {
  const { editorPage = [] } = await params;
  const path = `/${editorPage.join("/")}`;

  return {
    title: `"Brizy: ${path}`,
  };
}

export default async function Page({ params }: { params: Promise<{ editorPage: string[] }> }) {
  const { editorPage = [] } = await params;
  const path = `/${editorPage.join("/")}`;
  const page = getPage(path) || pageData;
  const project = getProject() || projectData;

  return <Client path={path} pageData={page} projectData={project} />;
}

export const dynamic = "force-dynamic";
