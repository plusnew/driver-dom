import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';


type labelElement = htmlGlobalAttributesElement<HTMLLabelElement> & {
  htmlFor?: string | null;
  form?: string | null;
};

export { labelElement };
