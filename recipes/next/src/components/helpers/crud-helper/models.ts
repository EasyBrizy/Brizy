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
