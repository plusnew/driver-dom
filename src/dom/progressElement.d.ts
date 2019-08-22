import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';


type progressElement = htmlGlobalAttributesElement<HTMLProgressElement> & {
  max?: number | null;
  value?: string | null;
};

export { progressElement };
