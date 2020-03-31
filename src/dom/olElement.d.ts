import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type olElement = htmlGlobalAttributesElement<HTMLOListElement> & {
  reversed?: boolean | null;
  start?: number | null;
  type?: "a" | "A" | "i" | "I" | "1" | null;
};

export { olElement };
