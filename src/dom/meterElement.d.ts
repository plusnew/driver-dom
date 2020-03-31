import { htmlGlobalAttributesElement } from "./abstract/htmlGlobalAttributesElement";
type meterElement = htmlGlobalAttributesElement<HTMLMeterElement> & {
  value?: number | null;
  min?: number | null;
  max?: number | null;
  low?: number | null;
  high?: number | null;
  optimum?: number | null;
  form?: string | null;
};

export { meterElement };
