import { createContext, FC, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { initialQueryResponse, QUERIES, QueryResponseContextProps, WithChildren } from "../../../helpers";
import { getCollections } from "./_requests";
import { Collection } from "./_models";

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
  } = useQuery([QUERIES.COLLECTIONS_LIST, query], () => getCollections(query), {
    staleTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return (
    <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, collection, query }}>
      {children}
    </QueryResponseContext.Provider>
  );
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
