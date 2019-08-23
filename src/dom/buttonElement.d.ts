import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
import { enctype } from './types/enctype';
import { target } from './types/target';
type buttonElement = htmlGlobalAttributesElement<HTMLButtonElement> & {
  autofocus?: boolean | null;
  disabled?: boolean | null;
  form?: string | null;
  formaction?: string | null;
  formenctype?: enctype | null;
  formnovalidate?: boolean | null;
  formtarget?: target | null;
  name?: string | null;
  type?: 'button' | 'reset' | 'submit' | null;
  value?: string | null;
};

export { buttonElement };
