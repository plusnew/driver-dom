import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
import { crossorigin } from "./types/crossorigin";
import { preload } from "./types/preload";
type videoElement = htmlGlobalAttributesElement<HTMLVideoElement> & {
  autoplay?: boolean | null;
  buffered?: string | null;
  controls?: boolean | null;
  crossorigin?: crossorigin | null;
  height?: number | null;
  loop?: boolean | null;
  muted?: boolean | null;
  preload?: preload | null;
  poster?: string | null;
  src?: string | null;
  width?: number | null;
  playsinline?: string | null;
};

export { videoElement };
