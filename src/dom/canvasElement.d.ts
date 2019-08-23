import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';
type canvasElement = htmlGlobalAttributesElement<HTMLCanvasElement> & {
  height?: number | null;
  width?: number | null;
};

export { canvasElement };
