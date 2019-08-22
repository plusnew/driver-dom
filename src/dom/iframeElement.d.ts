import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
import { importance } from './types/importance';
import { referrerpolicy } from './types/referrerpolicy';

type iframeElement = htmlGlobalAttributesElement<HTMLIFrameElement> & {
  allow?: string | null;
  height?: number | null;
  importance?: importance | null;
  name?: string | null;
  referrerpolicy?: referrerpolicy | null;
  sandbox?: "allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-ScriptProcessorNodeallow-top-navigation" | "allow-top-navigation-by-user-activation" | null;
  src?: string | null;
  srcdoc?: string | null;
  width?: number | null;
};

export { iframeElement };
