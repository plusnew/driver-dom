import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
type sourceElement = htmlGlobalAttributesElement<HTMLSourceElement> & {
  sizes?: string | null;
  src?: string | null;
  srcset?: string | null;
  type?: string | null;
  media?: string | null;
};

export { sourceElement };
