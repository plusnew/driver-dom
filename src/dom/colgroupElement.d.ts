import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type colgroupElement = htmlGlobalAttributesElement<HTMLTableColElement> & {
  span?: number | null;
};

export { colgroupElement };
