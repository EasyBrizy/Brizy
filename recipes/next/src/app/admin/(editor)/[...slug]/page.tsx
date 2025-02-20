/**
 * This file implements a *magic* catch-all route that renders the Brizy editor.
 *
 * This route exposes /admin/[...slug], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending by example in `/page/${title_of_page}` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a Brizy editor.
 *
 * This approach enables public pages to be statically rendered whilst the /admin route can
 * remain dynamic.
 *
 * NB this route is public, and you will need to add authentication
 */

import { Client } from "../client";
import { Metadata } from "next";
import { getPage } from "@/lib/item/getPage";
import { getProject } from "@/lib/project/getProject";
import { pageData as configPageData, projectData } from "@/brizy.config";
import { CollectionTypes, isCollectionType } from "@/types";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const [collection, item] = params.slug ?? [];

  return {
    title: item ?? collection,
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  let [collection, item] = params.slug;

  if (!item) {
    item = collection;
    collection = CollectionTypes.PAGE;
  }

  if (!isCollectionType(collection)) {
    return notFound();
  }

  const page = getPage(collection, item);

  const pageData = page
    ? {
        ...page,
        data: page.data || configPageData.data,
      }
    : configPageData;

  const project = getProject() ?? projectData;

  return <Client collection={collection} item={item} pageData={pageData} projectData={project} />;
}

export const dynamic = "force-dynamic";
