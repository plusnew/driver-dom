import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';


type tdElement = htmlGlobalAttributesElement<HTMLElement> & {
  colspan?: number | null;
  headers?: string | null;
  rowspan?: number | null;
};

export { tdElement };
