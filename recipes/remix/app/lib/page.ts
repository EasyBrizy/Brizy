import type { EditorPage } from "@brizy/builder/editor";
import fs from "fs";

// Replace with call to your database
export const getPage = (path: string): EditorPage | undefined => {
  const allData: Record<string, EditorPage> | null = fs.existsSync("pages.database.json")
    ? JSON.parse(fs.readFileSync("pages.database.json", "utf-8"))
    : null;

  return allData ? allData[path] : undefined;
};

export function setPage(path: string, pageData: EditorPage): void {
  const pageDataJson = JSON.parse(
    fs.existsSync("pages.database.json") ? fs.readFileSync("pages.database.json", "utf-8") : "{}",
  );

  const updatedPages = {
    ...pageDataJson,
    [path]: pageData,
  };

  fs.writeFileSync("pages.database.json", JSON.stringify(updatedPages));
}
