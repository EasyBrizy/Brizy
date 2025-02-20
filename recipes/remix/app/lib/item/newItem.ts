import { Item } from "./types";
import { addPageToDataBase } from "./utils";

export async function newItem(item: Item): Promise<Item> {
  addPageToDataBase(item);

  return item;
}
