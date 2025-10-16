export interface ScreenshotBaseData {
  base64: string;
  blockType: string;
}

export interface ScreenshotData extends ScreenshotBaseData {
  id: string;
}
