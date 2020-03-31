import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type styleElement = htmlGlobalAttributesElement<HTMLStyleElement> & {
  type?: string | null;
  media?: string | null;
  content?: string | null;
  nonce?: string | null;
  title?: string | null;
};

export { styleElement };
