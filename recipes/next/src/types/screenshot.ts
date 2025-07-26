export interface ScreenshotBaseData {
  base64: string;
  blockType: string;
}

export interface ScreenshotUpdateData extends ScreenshotBaseData {
  id: string;
}

export interface SavedScreenshotMeta {
  id: string;
  blockType: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
}
