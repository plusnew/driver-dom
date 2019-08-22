import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
import { crossorigin } from './types/crossorigin';
import { preload } from './types/preload';

type audioElement = htmlGlobalAttributesElement<HTMLAudioElement> & {
  autoplay?: boolean | null;
  crossorigin?: crossorigin | null;
  loop?: boolean | null;
  muted?: boolean | null;
  preload?: preload | null;
  src?: string | null;
};

export { audioElement };
