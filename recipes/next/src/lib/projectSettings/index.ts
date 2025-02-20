import fs from "fs";
import { ProjectSettings } from "./types";

export const getProjectSettings = (): ProjectSettings | null => {
  const setting = fs.existsSync("dashboard.database.json")
    ? JSON.parse(fs.readFileSync("dashboard.database.json", "utf-8"))
    : null;

  return setting?.projectSettings || null;
};

export const updateProjectSettings = (settings: ProjectSettings) =>
  fs.writeFileSync(
    "dashboard.database.json",
    JSON.stringify({
      projectSettings: settings,
    }),
  );
