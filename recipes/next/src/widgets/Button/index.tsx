import cn from "clsx";
import type { EditorToolbarOptions } from "@brizy/builder";
import { HOVER, NORMAL } from "../utils";
import "./index.scss";
import { Props } from "./types";
import { heightCSS, widthCSS } from "./utils";

const Button = (props: Props) => {
  const {
    isEditor,
    linkExternal,
    linkExternalBlank,
    linkExternalRel,
    customID,
    customClassName,
    text = "Button",
  } = props;
  const className = cn("button", customClassName, {
    blocked: isEditor,
  });

  return (
    <a
      id={customID}
      className={className}
      href={linkExternal}
      target={linkExternalBlank === "on" ? "_blank" : "_self"}
      rel={linkExternalRel === "on" ? "noopener nofollow" : "noopener"}
    >
      {text}
    </a>
  );
};

const toolbarOptions: EditorToolbarOptions = ({ t, device }) => [
  {
    selector: ".button",
    toolbar: [
      {
        id: "toolbarCurrent",
        type: "popover",
        config: {
          icon: "nc-button",
          title: t("Button"),
        },
        position: 20,
        options: [
          {
            id: "text",
            type: "inputText",
            label: t("Text"),
            default: {
              value: "Button",
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
                    selector: "{{WRAPPER}}:hover .button",
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
                id: "tabBg",
                label: t("Bg"),
                options: [
                  {
                    id: "backgroundColor",
                    type: "backgroundColor",
                    selector: "{{WRAPPER}}:hover .button",
                    states: [NORMAL, HOVER],
                    default: {
                      type: "solid",
                    },
                  },
                ],
              },
              {
                id: "tabText",
                label: t("Text"),
                options: [
                  {
                    id: "color",
                    type: "colorPicker",
                    selector: "{{WRAPPER}}:hover .button",
                    states: [NORMAL, HOVER],
                  },
                ],
              },
              {
                id: "tabBorder",
                label: t("Border"),
                options: [
                  {
                    id: "border",
                    type: "border",
                    selector: "{{WRAPPER}}:hover .button",
                    states: [NORMAL, HOVER],
                  },
                ],
              },
              {
                id: "tabBoxShadow",
                label: t("Shadow"),
                options: [
                  {
                    id: "boxShadow",
                    type: "boxShadow",
                    selector: "{{WRAPPER}}:hover .button",
                    states: [NORMAL, HOVER],
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
        id: "toolbarSettings",
        type: "popover",
        config: {
          icon: "nc-cog",
          title: t("Settings"),
        },
        position: 110,
        options: [
          {
            id: "customWidth",
            type: "slider",
            label: t("Width"),
            default: {
              value: 50,
              suffix: "px",
            },
            config: {
              min: 5,
              max: 300,
              units: [{ value: "px", title: "px" }],
            },
            style: widthCSS,
          },
          {
            id: "height",
            label: t("Height"),
            type: "slider",
            default: {
              value: 50,
              suffix: "px",
            },
            config: {
              min: 5,
              max: 100,
              units: [{ value: "px", title: "px" }],
            },
            style: heightCSS,
          },
          {
            id: "grid",
            type: "grid",
            config: {
              separator: true,
            },
            columns: [
              {
                id: "grid-settings",
                size: 1,
                options: [
                  {
                    id: "styles",
                    type: "sidebarTabsButton",
                    config: {
                      tabId: "styles",
                      text: t("Styling"),
                      icon: "nc-cog",
                    },
                  },
                ],
              },
            ],
          },
        ],
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

export const ButtonModule = {
  id: "Brizy.ThirdParty.Button",
  component: {
    editor: (props: Props) => <Button {...props} isEditor={true} />,
    view: Button,
  },
  title: "Button",
  icon: "nc-button",
  category: "custom",
  options: toolbarOptions,
};
