import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
import { enctype } from "./types/enctype";
import { method } from "./types/method";
import { target } from "./types/target";
type formElement = htmlGlobalAttributesElement<HTMLFormElement> & {
  "accept-charset"?: string | null;
  action?: string | null;
  autocomplete?: "on" | "off" | null;
  enctype?: enctype | null;
  method?: method | null;
  name?: string | null;
  novalidate?: boolean | null;
  target?: target | null;
};

export { formElement };
