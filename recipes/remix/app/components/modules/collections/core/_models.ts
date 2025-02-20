import { Response } from "~/components/helpers/crud-helper/models";
import type { Item } from "~/lib/item/types";

export type Collection = Item;
export type CollectionsQueryResponse = Response<Array<Collection>>;
