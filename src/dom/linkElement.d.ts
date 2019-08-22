import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
import { crossorigin } from './types/crossorigin';
import { importance } from './types/importance';
import { referrerpolicy } from './types/referrerpolicy';

type linkElement = htmlGlobalAttributesElement<HTMLLinkElement> & {
  as?: string | null;
  crossorigin?: crossorigin | null;
  href?: string | null;
  hreflang?: string | null;
  importance?: importance | null;
  integrity?: string | null;
  referrerpolicy?: referrerpolicy | null;
  rel?: string | null;
  sizes?: string | null;
  title?: string | null;
  type?: string | null;
};

export { linkElement };
