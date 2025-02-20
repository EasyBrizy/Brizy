import { Item } from "./types";
import { addPageToDataBase } from "@/lib/item/utils";

export async function newItem(item: Item): Promise<Item> {
  addPageToDataBase(item);

  return item;
}
