import { FC, createContext, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { WithChildren } from "../../../helpers";
import { Collection } from "./_models";
import { getCollections } from "./_requests";
import { QueryResponseContextProps } from "./types";

const initialQueryResponse = {
  refetch: () => {},
  collection: "page",
  isLoading: false,
  query: "",
};

const QueryResponseContext = createContext<QueryResponseContextProps<Collection>>(initialQueryResponse);

interface Props extends WithChildren {
  collection: string;
}

const QueryResponseProvider: FC<Props> = ({ collection, children }) => {
  const query = useMemo(() => `collection=${collection}`, [collection]);

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(["collections-list", query], () => getCollections(query), {
    staleTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const value = useMemo(
    () => ({ isLoading: isFetching, refetch, response, collection, query }),
    [isFetching, refetch, response, collection, query],
  );

  return <QueryResponseContext.Provider value={value}>{children}</QueryResponseContext.Provider>;
};

const useQueryResponse = () => useContext(QueryResponseContext);

const useCollectionQuery = () => {
  const { response } = useQueryResponse();
  if (!response) {
    return [];
  }

  return response?.data || [];
};

export { QueryResponseProvider, useQueryResponse, useCollectionQuery };
