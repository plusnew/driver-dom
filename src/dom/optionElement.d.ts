import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type optionElement = htmlGlobalAttributesElement<HTMLOptionElement> & {
  disabled?: boolean | null;
  label?: string | null;
  selected?: boolean | null;
  value?: string | null;
};

export { optionElement };
