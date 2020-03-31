import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type detailsElement = htmlGlobalAttributesElement<HTMLDetailsElement> & {
  open?: boolean | null;
};

export { detailsElement };
