import { Response } from "@/components/helpers";

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined;
  collection: string;
  refetch: () => void;
  isLoading: boolean;
  query: string;
};
