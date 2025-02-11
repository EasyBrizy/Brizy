import { Item } from "./types";
import { readPagesDataBase } from "@/lib/item/utils";

type Query = {
  type: string;
};

export async function getItems(query: Query): Promise<Array<Item>> {
  const allPages: Item[] = readPagesDataBase();

  const { type } = query;

  // Filter items based on the query type
  return allPages.filter((page) => page.slug.collection === type);
}
