import type { EditorProject } from "@brizy/builder";
import fs from "fs";

export const updateProject = (projectData: EditorProject | null) => {
  if (!projectData) {
    return;
  }

  fs.writeFileSync("project.database.json", JSON.stringify(projectData));
};
