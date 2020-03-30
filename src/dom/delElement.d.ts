import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type delElement = htmlGlobalAttributesElement<HTMLModElement> & {
  cite?: string | null;
  datetime?: string | null;
};

export { delElement };
