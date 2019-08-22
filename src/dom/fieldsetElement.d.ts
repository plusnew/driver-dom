import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';


type fieldsetElement = htmlGlobalAttributesElement<HTMLFieldSetElement> & {
  disabled?: boolean | null;
  form?: string | null;
  name?: string | null;
};

export { fieldsetElement };
