import { ActionFunction } from "@remix-run/node";
import { getProjectSettings, updateProjectSettings } from "~/lib/projectSettings";
import { ProjectSettings } from "~/lib/projectSettings/types";

export const loader = async () => {
  try {
    const settings = getProjectSettings();

    return Response.json(
      { success: true, data: settings },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Failed to get settings" }, { status: 400 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const data = await request.json();

    switch (request.method) {
      case "PUT":
        return updateSettings(data.projectSettings);
      default:
        return Response.json("Method not allowed", {
          status: 405,
        });
    }
  } catch (e) {
    console.error(e);
    return Response.json("Fail to create item", {
      status: 400,
    });
  }
};

const updateSettings = (projectSettings: ProjectSettings) => {
  try {
    if (!projectSettings) {
      return Response.json("Settings not found", {
        status: 400,
      });
    }

    updateProjectSettings(projectSettings);

    return Response.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json("Fail to update settings", {
      status: 400,
    });
  }
};
