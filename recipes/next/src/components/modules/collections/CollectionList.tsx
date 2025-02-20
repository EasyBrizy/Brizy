"use client";

import { FC } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { QueryResponseProvider, useCollectionQuery } from "./core/QueryResponseProvider";

interface Props {
  collection: string;
}

export const CollectionsList: FC = () => {
  const collections = useCollectionQuery();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={collections} columns={columns} />
    </div>
  );
};

const CollectionsListWrapper = ({ collection }: Props) => (
  <QueryResponseProvider collection={collection}>
    <CollectionsList />
  </QueryResponseProvider>
);

export { CollectionsListWrapper };
