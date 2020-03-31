import type { IDriver } from "@plusnew/core/src/interfaces/driver";
import element from "./element";
import text from "./text";

export default (rootElement: Element): IDriver<Element, Text> => {
  for (let i = 0; i < rootElement.childNodes.length; i += 1) {
    rootElement.childNodes[i].remove();
  }

  return {
    element,
    text,
    getRootElement: () => rootElement,
    setupPortal: ({ portalEntrance, portalExit }) => {
      // PortalEntrance has to create new renderoptions, to break referencing and to create a new copy
      portalEntrance.renderOptions = {
        ...portalEntrance.renderOptions,
        xmlns: portalExit.renderOptions.xmlns,
        xmlnsPrefixes: portalExit.renderOptions.xmlnsPrefixes,
      };
    },
  };
};
