import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
import { autocomplete } from "./types/autocomplete";
type selectElement = htmlGlobalAttributesElement<HTMLSelectElement> & {
  autocomplete?: autocomplete | null;
  autofocus?: boolean | null;
  disabled?: boolean | null;
  form?: string | null;
  multiple?: boolean | null;
  name?: string | null;
  required?: boolean | null;
  size?: number | null;
  value: string;
};

export { selectElement };
