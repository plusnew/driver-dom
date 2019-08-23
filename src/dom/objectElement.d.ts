import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
type objectElement = htmlGlobalAttributesElement<HTMLObjectElement> & {
  data?: string | null;
  form?: string | null;
  height?: number | null;
  name?: string | null;
  type?: string | null;
  typemustmatch?: boolean | null;
  usemap?: string | null;
  width?: number | null;
};

export { objectElement };
