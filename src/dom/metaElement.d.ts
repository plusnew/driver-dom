import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type metaElement = htmlGlobalAttributesElement<HTMLMetaElement> & {
  content?: string | null;
  "http-equiv"?: "content-security-policy" | "refresh" | "set-cookie" | null;
  name?:
    | "application-name"
    | "author"
    | "description"
    | "keywords"
    | "referrer"
    | "creator"
    | "googlebot"
    | "publisher"
    | "robots"
    | "slurl"
    | "viewport"
    | null;
};

export { metaElement };
