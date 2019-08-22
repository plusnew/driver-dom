import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';


type insElement = htmlGlobalAttributesElement<HTMLModElement> & {
  cite?: string | null;
  datetime?: string | null;
};

export { insElement };
