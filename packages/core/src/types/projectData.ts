import { Literal } from "@/utils/types";
import { Fonts } from "./fonts";
import { ExtraFontStyle, Style } from "./style";

export interface ProjectData {
  id: Literal;
  data: {
    styles: Style[];
    font: string;
    fonts: Fonts;
    extraFontStyles?: ExtraFontStyle[];
    extraStyles?: Style[];
    disabledElements?: string[];
    pinnedElements?: string[];
  };
  dataVersion: number;
}
