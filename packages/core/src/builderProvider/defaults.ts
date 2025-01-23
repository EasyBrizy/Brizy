//#region Compiler

export const compiler = () => ({
  disabled: true,
});

//#endregion

//#region ContentDefaults

export const contentDefaults = () => ({
  Row2: {
    items: [
      {
        type: "Column2",
        value: {
          _styles: ["column2"],
          items: [],
        },
      },
      {
        type: "Column2",
        value: {
          _styles: ["column2"],
          items: [],
        },
      },
    ],
  },
  Column2: [
    {
      type: "Column2",
      value: {
        _styles: ["column2"],
        items: [],
      },
    },
    {
      type: "Column2",
      value: {
        _styles: ["column2"],
        items: [],
      },
    },
  ],
});

//#endregion

//#region ProjectData

export const projectData = () => ({
  dataVersion: 1,
  data: {
    styles: [
      {
        id: "default",
        title: "Default",
        colorPalette: [
          { id: "color1", hex: "#000000" },
          { id: "color2", hex: "#FFFFFF" },
        ],
        fontStyles: [],
      },
    ],
  },
});

//#endregion
