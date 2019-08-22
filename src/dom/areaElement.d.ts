import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
import { referrerpolicy } from './types/referrerpolicy';

type areaElement = htmlGlobalAttributesElement<HTMLAreaElement> & {
  alt: string;
  coords?: string | null;
  download?: string | null;
  href?: string | null;
  hreflang?: string | null;
  ping?: string | null;
  referrerpolicy?: referrerpolicy | null;
  rel?: string | null;
  shape?: string | null;
  target?: string | null;
};

export { areaElement };
