export type ID = undefined | null | number | string;

export type Response<T> = {
  data?: T;
  payload?: {
    message?: string;
    errors?: {
      [key: string]: Array<string>;
    };
  };
};

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined;
  collection: string;
  refetch: () => void;
  isLoading: boolean;
  query: string;
};

export const initialQueryResponse = {
  refetch: () => {},
  collection: "page" as const,
  isLoading: false,
  query: "",
};
