import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type outputElement = htmlGlobalAttributesElement<HTMLOutputElement> & {
  for?: string | null;
  form?: string | null;
  name?: string | null;
};

export { outputElement };
