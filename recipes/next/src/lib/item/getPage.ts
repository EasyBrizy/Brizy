import type { EditorPage } from "@brizy/builder";
import { readPagesDataBase } from "@/lib/item/utils";

export const getPage = (collection: string, slug: string): EditorPage | undefined => {
  console.log("before collection", slug);

  const pages = readPagesDataBase();
  console.log("after pages", pages);

  return pages.find((page) => page.slug.collection === collection && page.slug.item === slug);
};
