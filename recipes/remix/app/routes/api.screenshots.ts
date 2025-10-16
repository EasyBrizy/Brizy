import { ActionFunctionArgs } from "@remix-run/node";
import { createImage } from "~/lib/storage/screenshotStore";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { base64, blockType } = await request.json();
    const id = await createImage({ base64, blockType });
    return Response.json({ id });
  } catch (e) {
    return Response.json({ error: "Failed to save image" }, { status: 500 });
  }
}
