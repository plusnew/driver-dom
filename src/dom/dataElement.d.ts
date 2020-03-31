import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type dataElement = htmlGlobalAttributesElement<HTMLDataElement> & {
  value?: string | null;
};

export { dataElement };
