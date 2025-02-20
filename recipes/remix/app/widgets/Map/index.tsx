import type { EditorToolbarOptions } from "@brizy/builder";
import { Editor } from "./Editor";
import { View } from "./View";
import "./index.scss";

const toolbarOptions: EditorToolbarOptions = () => {
  return [
    {
      selector: ".mapThirdComponent",
      toolbar: [
        {
          id: "toolbarCurrentElement",
          type: "popover",
          config: {
            icon: "nc-pin",
            title: "Map",
          },
          devices: "desktop",
          position: 90,
          options: [
            {
              id: "tabsCurrentElement",
              type: "tabs",
              tabs: [
                {
                  id: "tabCurrentElement",
                  label: "Map",
                  options: [
                    {
                      id: "address",
                      label: "Address",
                      type: "inputText",
                      placeholder: "Enter address",
                      default: {
                        value: "Chisinau",
                      },
                    },
                    {
                      id: "width",
                      label: "Width",
                      type: "slider",
                      config: {
                        min: 0,
                        max: 100,
                        units: [
                          { title: "px", value: "px" },
                          { title: "%", value: "%" },
                        ],
                      },
                      default: {
                        value: 100,
                        suffix: "%",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
};

export const MapModule = {
  id: "Brizy.ThirdParty.Map",
  component: {
    editor: Editor,
    view: View,
  },
  icon: "nc-pin",
  title: "Map",
  category: "custom",
  options: toolbarOptions,
};
