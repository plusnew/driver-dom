import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type embedElement = htmlGlobalAttributesElement<HTMLEmbedElement> & {
  height?: number | null;
  src?: string | null;
  type?: string | null;
  width?: number | null;
};

export { embedElement };
