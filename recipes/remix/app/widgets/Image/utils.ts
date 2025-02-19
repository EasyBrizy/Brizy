interface SliderProps {
  value: {
    value: number;
    unit: string;
  };
}

export const sizeCSS = ({ value: { value, unit } }: SliderProps) => ({
  "{{WRAPPER}}": {
    "max-width": `${value}${unit}`
  }
});
