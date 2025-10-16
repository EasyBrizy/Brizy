import { NextRequest, NextResponse } from "next/server";
import { createImage } from "@/lib/storage/screenshotStore";

export async function POST(req: NextRequest) {
  try {
    const { base64, blockType } = await req.json();

    if (!base64 || !blockType) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const id = await createImage({ base64, blockType });
    return NextResponse.json({ id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save image" }, { status: 500 });
  }
}
