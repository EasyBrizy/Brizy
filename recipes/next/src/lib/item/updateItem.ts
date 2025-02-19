import { Item } from "./types";
import { updatePageInDataBase } from "@/lib/item/utils";

interface Data {
  id: string;
  slug?: Item["slug"];
  data?: Item["data"];
}

export async function updateItem(data: Data): Promise<Item> {
  return updatePageInDataBase(data);
}
