import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type qElement = htmlGlobalAttributesElement<HTMLQuoteElement> & {
  cite?: string | null;
};

export { qElement };
