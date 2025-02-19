interface SliderProps {
  value: {
    value: number;
    unit: string;
  };
}

export const widthCSS = ({ value: { value, unit } }: SliderProps) => ({
  "{{WRAPPER}} .button": {
    "min-width": `${value}${unit}`
  }
});

export const heightCSS = ({ value: { value, unit } }: SliderProps) => ({
  "{{WRAPPER}} .button": {
    "min-height": `${value}${unit}`
  }
});
