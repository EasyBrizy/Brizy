export interface Props {
  isEditor?: boolean;
  text: string;
  linkExternal?: string;
  linkExternalBlank?: "on" | "off";
  linkExternalRel?: "on" | "off";
  customID?: string;
  customClassName?: string;
}
