import { EditorThirdPartyComponents } from "@brizy/builder";
import { ButtonModule } from "~/widgets/Button";
import { CounterModule } from "~/widgets/Counter";
import { ImageModule } from "~/widgets/Image";
import { MapModule } from "~/widgets/Map";
import { TextModule } from "~/widgets/Text";

export const thirdPartyComponents: EditorThirdPartyComponents = {
  [TextModule.id]: TextModule,
  [ButtonModule.id]: ButtonModule,
  [CounterModule.id]: CounterModule,
  [ImageModule.id]: ImageModule,
  [MapModule.id]: MapModule,
};
