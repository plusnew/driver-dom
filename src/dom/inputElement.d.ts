import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
import { autocomplete } from "./types/autocomplete";
import { enctype } from "./types/enctype";
import { target } from "./types/target";
import { truefalse } from "./types/truefalse";
type inputElement = htmlGlobalAttributesElement<HTMLInputElement> & {
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  accept?: string | null;
  autocomplete?: autocomplete | null;
  autofocus?: boolean | null;
  capture?: boolean | null;
  checked?: boolean | null;
  disabled?: boolean | null;
  form?: string | null;
  formaction?: string | null;
  formenctype?: enctype | null;
  formtarget?: target | null;
  height?: number | null;
  inputmode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | null;
  list?: string | null;
  max?: number | string | null;
  maxlength?: number | null;
  min?: number | string | null;
  minlength?: number | null;
  multiple?: boolean | null;
  name?: string | null;
  pattern?: RegExp | null;
  placeholder?: string | null;
  readonly?: boolean | null;
  required?: boolean | null;
  size?: number | null;
  spellcheck?: truefalse | null;
  src?: string | null;
  step?: number | null;
  value?: string | null;
  width?: number | null;
};

export { inputElement };
