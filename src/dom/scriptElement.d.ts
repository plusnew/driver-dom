import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
import { crossorigin } from './types/crossorigin';
import { importance } from './types/importance';
type scriptElement = htmlGlobalAttributesElement<HTMLScriptElement> & {
  async?: boolean | null;
  crossorigin?: crossorigin | null;
  defer?: boolean | null;
  importance?: importance | null;
  integrity?: string | null;
  nomodule?: boolean | null;
  nonce?: string | null;
  src?: string | null;
  text?: string | null;
  type?: string | null;
};

export { scriptElement };
