import cn from "clsx";
import { JSX } from "react";
import type { EditorToolbarOptions } from "@brizy/builder";
import { HOVER, NORMAL } from "../utils";
import "./index.scss";
import { Props } from "./types";

const Text = (props: Props): JSX.Element => {
  const {
    isEditor,
    customID,
    linkExternal,
    linkExternalBlank,
    linkExternalRel,
    customClassName,
    text = "Text",
  } = props;
  const className = cn("text", customClassName);
  let content = <>{text}</>;

  if (linkExternal) {
    const className = cn({ blocked: isEditor });
    content = (
      <a
        className={className}
        href={linkExternal}
        target={linkExternalBlank === "on" ? "_blank" : "_self"}
        rel={linkExternalRel === "on" ? "noopener nofollow" : "noopener"}
      >
        {content}
      </a>
    );
  }

  return (
    <p id={customID} className={className}>
      {content}
    </p>
  );
};

const toolbarOptions: EditorToolbarOptions = ({ t, device }) => [
  {
    selector: ".text",
    toolbar: [
      {
        id: "toolbarCurrent",
        type: "popover",
        config: {
          icon: "nc-wp-shortcode-element",
          title: t("Text"),
        },
        position: 20,
        options: [
          {
            id: "text",
            type: "inputText",
            label: t("Text"),
            default: {
              value: "Text",
            },
          },
        ],
      },

      {
        id: "toolbarTypography",
        type: "popover",
        config: {
          icon: "nc-font",
          size: device === "desktop" ? "xlarge" : "auto",
          title: t("Typography"),
        },
        position: 30,
        options: [
          {
            id: "gridTypography",
            type: "grid",
            className: "brz-typography-grid",
            config: {
              separator: true,
            },
            columns: [
              {
                id: "col-1",
                size: 1,
                align: "center",
                options: [
                  {
                    id: "typography",
                    type: "typography",
                    selector: "{{WRAPPER}}:hover .text",
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: "toolbarColor",
        type: "popover",
        devices: "desktop",
        position: 40,
        config: {
          size: "medium",
          title: t("Colors"),
          icon: {
            style: {
              backgroundColor: "#000000",
            },
          },
        },
        options: [
          {
            id: "tabsColor",
            type: "tabs",
            tabs: [
              {
                id: "tabText",
                label: t("Color"),
                options: [
                  {
                    id: "color",
                    type: "colorPicker",
                    selector: "{{WRAPPER}}:hover .text",
                    states: [NORMAL, HOVER],
                  },
                ],
              },
              {
                id: "tabShadow",
                label: t("Shadow"),
                options: [
                  {
                    id: "textShadow",
                    type: "textShadow",
                    states: [NORMAL, HOVER],
                    selector: "{{WRAPPER}}:hover .text",
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: "toolbarLink",
        type: "popover",
        config: {
          icon: "nc-link",
          size: "medium",
          title: t("Link"),
        },
        devices: "desktop",
        position: 50,
        options: [
          {
            id: "linkExternal",
            type: "inputText",
            label: t("Link to"),
            placeholder: "http://",
          },
          {
            id: "linkExternalBlank",
            label: t("Open In New Tab"),
            type: "switch",
          },
          {
            id: "linkExternalRel",
            label: t("Make it Nofollow"),
            type: "switch",
          },
        ],
      },

      {
        id: "advancedSettings",
        type: "advancedSettings",
        position: 110,
        devices: "desktop",
        title: t("Settings"),
      },
    ],
    sidebar: [
      {
        id: "sidebarTabs",
        type: "sidebarTabs",
        tabs: [
          {
            id: "styles",
            title: t("Styling"),
            label: t("Styling"),
            options: [
              {
                id: "settingsTabs",
                type: "tabs",
                config: {
                  align: "start",
                },
                devices: "desktop",
                tabs: [
                  {
                    id: "moreSettingsAdvanced",
                    label: t("Advanced"),
                    icon: "nc-cog",
                    options: [
                      {
                        id: "customID",
                        type: "inputText",
                        label: t("CSS ID"),
                        display: "block",
                        helper: {
                          content: t("Add your custom ID without the #pound, example: my-id"),
                        },
                      },

                      {
                        id: "customClassName",
                        type: "inputText",
                        label: t("CSS Class"),
                        display: "block",
                        helper: {
                          content: t("Add your custom class without the .dot, example: my-class"),
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
    ],
  },
];

export const TextModule = {
  id: "Brizy.ThirdParty.Text",
  component: {
    editor: (props: Props) => <Text {...props} isEditor={true} />,
    view: Text,
  },
  title: "Text",
  icon: "nc-font",
  category: "custom",
  options: toolbarOptions,
};
