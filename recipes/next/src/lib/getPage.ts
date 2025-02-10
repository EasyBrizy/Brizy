import type { EditorPage } from "@brizy/builder";
import fs from "fs";

// Replace with call to your database
export const getPage = (path: string): EditorPage | undefined => {
  const allData: Record<string, EditorPage> | null = fs.existsSync("pages.database.json")
    ? JSON.parse(fs.readFileSync("pages.database.json", "utf-8"))
    : null;

  return allData ? allData[path] : undefined;
};
