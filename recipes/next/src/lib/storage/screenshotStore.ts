import { randomUUID } from "crypto";
import { access, constants, mkdir, writeFile } from "fs/promises";
import path from "path";
import type { ScreenshotBaseData, ScreenshotData } from "@/types/screenshot";

const UPLOADS_DIR = path.join(process.cwd(), "tmp/screenshots");

// Initialize directory when needed, not at module level
async function ensureUploadsDir(): Promise<void> {
  try {
    await access(UPLOADS_DIR, constants.F_OK);
  } catch {
    await mkdir(UPLOADS_DIR, { recursive: true });
  }
}

function parseBase64Image(base64DataUrl: string): Buffer {
  if (!base64DataUrl?.trim()) {
    throw new Error("Base64 image data is required");
  }

  const match = base64DataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match || match.length !== 3) {
    throw new Error("Invalid base64 format. Expected: data:image/type;base64,data");
  }

  try {
    return Buffer.from(match[2], "base64");
  } catch {
    throw new Error("Failed to decode base64 data");
  }
}

export async function createImage({ base64 }: ScreenshotBaseData): Promise<string> {
  try {
    await ensureUploadsDir();

    const buffer = parseBase64Image(base64);
    const id = randomUUID();
    const fileName = `${id}.jpg`;
    const filePath = path.join(UPLOADS_DIR, fileName);

    await writeFile(filePath, buffer);
    return id;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to create image: ${message}`);
  }
}

export async function updateImage({ id, base64 }: ScreenshotData): Promise<string> {
  try {
    const meta = await getImageMetaById(id);
    if (meta === null) {
      return await createImage({ base64 } as ScreenshotBaseData);
    }

    //Update image
    const buffer = parseBase64Image(base64);
    await writeFile(meta.filePath, buffer);

    return id;
  } catch (e) {
    throw new Error(`Failed to update image: ${e}`);
  }
}

export async function getImageMetaById(id: string): Promise<{ filePath: string; fileName: string } | null> {
  if (!id?.trim()) {
    return null;
  }

  try {
    const fileName = `${id}.jpg`;
    const filePath = path.join(UPLOADS_DIR, fileName);

    await access(filePath, constants.F_OK); // Ensure file exists
    return {
      filePath,
      fileName,
    };
  } catch {
    return null;
  }
}
