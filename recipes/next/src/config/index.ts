interface Config {
  dbUrl: string;
  dbName: string;
}

export const getConfig = (): Config => {
  return {
    dbUrl: process.env["MONGODB_URI"] ?? "",
    dbName: process.env["MONGODB_DATABASE_NAME"] ?? "",
  };
};
