import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type labelElement = htmlGlobalAttributesElement<HTMLLabelElement> & {
  for?: string | null;
  form?: string | null;
};

export { labelElement };
