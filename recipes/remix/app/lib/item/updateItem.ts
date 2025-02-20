import { Item } from "./types";
import { updatePageInDataBase } from "./utils";

interface Data {
  id: string;
  slug?: Item["slug"];
  data?: Item["data"];
}

export function updateItem(data: Data): Item {
  return updatePageInDataBase(data);
}
