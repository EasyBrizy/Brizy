import { EditorThirdPartyComponents } from "@brizy/builder";
import { ButtonModule } from "~/widgets/Button";
import { ImageModule } from "~/widgets/Image";
import { TextModule } from "~/widgets/Text";

// import { CounterModule } from "~/widgets/Counter";
// import { MapModule } from "~/widgets/Map";

export const thirdPartyComponents: EditorThirdPartyComponents = {
  [TextModule.id]: TextModule,
  [ButtonModule.id]: ButtonModule,
  [ImageModule.id]: ImageModule,
  // [CounterModule.id]: CounterModule,
  // [MapModule.id]: MapModule,
};
