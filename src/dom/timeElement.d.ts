import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';


type timeElement = htmlGlobalAttributesElement<HTMLTimeElement> & {
  datetime?: string | null;
};

export { timeElement };
