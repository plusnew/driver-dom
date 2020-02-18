import { IDriver } from '@plusnew/core/src/interfaces/driver';
import element from './element';
import text from './text';

export default (rootElement: Element): IDriver<Element, Text> =>  {
  for (let i = 0; i < rootElement.childNodes.length; i += 1) {
    rootElement.childNodes[i].remove();
  }

  return {
    element,
    text,
    getRootElement: () => rootElement,
    setupPortal: ({ portalEntrance, portalExit }) => {
      portalEntrance.renderOptions.xmlns = portalExit.renderOptions.xmlns;
      portalEntrance.renderOptions.xmlnsPrefixes = portalExit.renderOptions.xmlnsPrefixes;
    },
  };
};
