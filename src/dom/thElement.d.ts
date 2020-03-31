import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type thElement = htmlGlobalAttributesElement<HTMLElement> & {
  abbr?: string | null;
  colspan?: number | null;
  headers?: string | null;
  rowspan?: number | null;
  scope?: "row" | "col" | "rowgroup" | "colgroup" | "auto" | null;
};

export { thElement };
