import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
import { crossorigin } from "./types/crossorigin";
import { importance } from "./types/importance";
import { referrerpolicy } from "./types/referrerpolicy";
type imgElement = htmlGlobalAttributesElement<HTMLImageElement> & {
  alt?: string | null;
  crossorigin?: crossorigin | null;
  decoding?: "sync" | "async" | "auto" | null;
  height?: number | null;
  importance?: importance | null;
  ismap?: boolean | null;
  referrerpolicy?: referrerpolicy | null;
  sizes?: string | null;
  src: string;
  srcset?: string | null;
  width?: number | null;
  usemap?: string | null;
};

export { imgElement };
