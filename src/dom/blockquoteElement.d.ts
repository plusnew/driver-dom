import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';


type blockquoteElement = htmlGlobalAttributesElement<HTMLQuoteElement> & {
  cite?: string | null;
};

export { blockquoteElement };
