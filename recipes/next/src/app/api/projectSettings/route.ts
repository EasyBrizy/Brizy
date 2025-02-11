import { NextResponse } from "next/server";
import { getProjectSettings, updateProjectSettings } from "@/lib/projectSettings";

export async function GET() {
  try {
    const settings = getProjectSettings();

    return NextResponse.json(
      {
        success: true,
        data: settings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get settings" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const { projectSettings } = await req.json();
    updateProjectSettings(projectSettings);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 400 });
  }
}
