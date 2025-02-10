import cn from "classnames";
import { JSX } from "react";
import { EditorToolbarOptions } from "@brizy/builder";
import { HOVER, NORMAL } from "../utils";
import "./index.scss";
import { Props } from "./types";
import { sizeCSS } from "./utils";

const Image = (props: Props): JSX.Element => {
  const {
    isEditor,
    linkExternal,
    linkExternalBlank,
    linkExternalRel,
    customID,
    customClassName,
    imageAlt = "image",
    imageSrc = "https://www.bsr.org/images/heroes/bsr-focus-nature-hero.jpg",
  } = props;
  const className = cn("image-wrapper", customClassName);

  let content = (
    <picture id={customID} className={className}>
      <img className="image" src={imageSrc} alt={imageAlt} />
    </picture>
  );

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

  return content;
};

const toolbarOptions: EditorToolbarOptions = ({ t }) => [
  {
    selector: ".image",
    toolbar: [
      {
        id: "toolbarCurrent",
        type: "popover",
        config: {
          icon: "nc-image",
          title: t("Image"),
        },
        position: 20,
        options: [
          {
            id: "imageSrc",
            type: "inputText",
            label: t("URL"),
            default: {
              value: "https://www.bsr.org/images/heroes/bsr-focus-nature-hero.jpg",
            },
          },
          {
            id: "imageAlt",
            type: "inputText",
            label: t("Alt"),
            default: {
              value: "Image",
            },
          },
        ],
      },

      {
        id: "toolbarColor",
        type: "popover",
        devices: "desktop",
        position: 30,
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
                label: t("Overlay"),
                options: [
                  {
                    id: "backgroundColor",
                    type: "backgroundColor",
                    selector: "{{WRAPPER}}:hover .image-wrapper:after",
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
                    selector: "{{WRAPPER}}:hover .image-wrapper:after",
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
                    selector: "{{WRAPPER}}:hover .image-wrapper:after",
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
        position: 40,
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
            id: "size",
            label: t("Size"),
            type: "slider",
            default: {
              value: 100,
              suffix: "%",
            },
            config: {
              min: 5,
              max: 100,
              units: [{ value: "%", title: "%" }],
            },
            style: sizeCSS,
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

export const ImageModule = {
  id: "Brizy.ThirdParty.Image",
  component: {
    editor: (props: Props) => <Image {...props} isEditor={true} />,
    view: Image,
  },
  title: "Image",
  icon: "nc-img",
  category: "custom",
  options: toolbarOptions,
};
