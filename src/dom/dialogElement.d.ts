import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';


type dialogElement = htmlGlobalAttributesElement<HTMLDialogElement> & {
  open?: boolean | null;
};

export { dialogElement };
