import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
type paramElement = htmlGlobalAttributesElement<HTMLParamElement> & {
  name?: string | null;
  value?: string | null;
};

export { paramElement };
