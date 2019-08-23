import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
import { referrerpolicy } from './types/referrerpolicy';
import { target } from './types/target';
type aElement = htmlGlobalAttributesElement<HTMLAnchorElement> & {
  download?: string | null;
  href?: string | null;
  hreflang?: string | null;
  ping?: string | null;
  referrerpolicy?: referrerpolicy | null;
  rel?: string | null;
  target?: target | null;
  type?: string | null;
};

export { aElement };
