import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type optgroupElement = htmlGlobalAttributesElement<HTMLOptGroupElement> & {
  disabled?: boolean | null;
  label?: string | null;
};

export { optgroupElement };
