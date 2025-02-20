import type { EditorProject } from "@brizy/builder";
import fs from "fs";

// Replace with call to your database
export const getProject = (): EditorProject | undefined => {
  const allData: EditorProject | null = fs.existsSync("project.database.json")
    ? JSON.parse(fs.readFileSync("project.database.json", "utf-8"))
    : null;

  return allData ?? undefined;
};
