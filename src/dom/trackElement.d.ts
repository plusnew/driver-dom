import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type trackElement = htmlGlobalAttributesElement<HTMLTrackElement> & {
  default?: boolean | null;
  kind?:
    | "subtitles"
    | "captions"
    | "descriptions"
    | "chapters"
    | "metadata"
    | null;
  src: string;
  srclang?: string | null;
};

export { trackElement };
