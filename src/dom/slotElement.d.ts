import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type slotElement = htmlGlobalAttributesElement<HTMLElement> & {
  name?: string | null;
};

export { slotElement };
