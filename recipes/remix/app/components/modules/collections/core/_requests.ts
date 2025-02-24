import axios from "axios";
import { ID } from "~/components/helpers/crud-helper/models";
import { Collection, CollectionsQueryResponse } from "./_models";

const GET_COLLECTIONS_URL = `/action/items`;

const getCollections = async (query: string): Promise<CollectionsQueryResponse> => {
  const reg = await axios.get(`${GET_COLLECTIONS_URL}?${query}`);
  return reg.data;
};

const createCollection = async (
  collectionType: string,
): Promise<{
  data: Collection;
  success: boolean;
}> => {
  const id = Math.random().toString(36).slice(2);
  const collectionName = collectionType === "blog" ? "post" : collectionType;
  const title = `${collectionName}-${id}`;

  return (
    await axios.post(GET_COLLECTIONS_URL, {
      id,
      title,
      slug: {
        collection: collectionType,
        item: title,
      },
    })
  ).data;
};

const deleteItem = async (id: ID): Promise<void> => {
  return await axios.delete(GET_COLLECTIONS_URL, {
    data: { ids: [id] },
  });
};

const deleteSelectedItems = async (ids: Array<ID>): Promise<void> => {
  return await axios.delete(`${GET_COLLECTIONS_URL}`, {
    data: { ids },
  });
};

export { getCollections, deleteItem, deleteSelectedItems, createCollection };
