import { NextRequest, NextResponse } from "next/server";
import { saveScreenshot, updateData } from "@/lib/storage/screenshotStore";
import { ScreenshotBaseData, ScreenshotUpdateData } from "@/types/screenshot";

// POST /api/screenshot → create new
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as ScreenshotBaseData;

    if (!body.base64 || !body.blockType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { id } = await saveScreenshot(body);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}

// PUT /api/screenshot → update existing
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as ScreenshotUpdateData;

    if (!body.id || !body.base64 || !body.blockType) {
      return NextResponse.json({ error: "Missing id, base64 or blockType" }, { status: 400 });
    }

    const result = await updateData(body);
    if (!result) {
      return NextResponse.json({ error: "Screenshot not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}
