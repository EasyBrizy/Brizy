import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { createReadStream } from "fs";
import { Readable } from "node:stream";
import { getImageMetaById, updateImage } from "~/lib/storage/screenshotStore";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  try {
    const meta = await getImageMetaById(id as string);
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
    return Response.json({ error: `Failed to get image: ${e}` }, { status: 404 });
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method !== "PUT") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const response = await request.json();
    if (!response) {
      return Response.json({ error: "Missing Data" }, { status: 400 });
    }

    const _id = await updateImage({ ...response, id: params.id });
    return Response.json({ id: _id });
  } catch (e) {
    return Response.json({ error: "Failed to update image", status: 400 });
  }
}
