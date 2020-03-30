import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type textareaElement = htmlGlobalAttributesElement<HTMLTextAreaElement> & {
  autocomplete?: "on" | "off" | null;
  autofocus?: boolean | null;
  cols?: number | null;
  disabled?: boolean | null;
  form?: string | null;
  maxlength?: number | null;
  minlength?: number | null;
  name?: string | null;
  placeholder?: string | null;
  readonly?: boolean | null;
  required?: boolean | null;
  rows?: number | null;
  value?: string | null;
  spellcheck?: "true" | "default" | "false" | null;
  wrap?: "hard" | "soft" | null;
};

export { textareaElement };
