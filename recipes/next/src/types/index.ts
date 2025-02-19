export enum CollectionTypes {
  PAGE = "page",
  BLOG = "blog",
}

export const isCollectionType = (type: string): type is CollectionTypes =>
  Object.values(CollectionTypes).includes(type as CollectionTypes);
