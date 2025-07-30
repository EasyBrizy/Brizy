import { createReadStream } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "node:stream";
import { getImageMetaById, updateImage } from "@/lib/storage/screenshotStore";

export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse | Response> {
  const { id } = params;
  try {
    const meta = await getImageMetaById(id);

    if (meta === null) {
      throw new Error("No image with id provided");
    }

    const { filePath } = meta;
    const image = createReadStream(filePath);

    const webStream = Readable.toWeb(image) as globalThis.ReadableStream;
    return new Response(webStream, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${id}.jpeg"`,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: `Failed to get image: ${e}` }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const response = await req.json();
    if (!response) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const _id = await updateImage({ ...response, id: params.id });
    return NextResponse.json({ id: _id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
