import { updateProject } from "@/lib/project/updateProject";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { projectData } = await req.json();
    updateProject(projectData);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Fail to get project" }, { status: 400 });
  }
}
