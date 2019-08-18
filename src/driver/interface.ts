type PlusnewInstance<HostElement, HostTextElement> = {
  renderOptions: {
    driver: any;
    xmlns?: string;
    xmlnsPrefixes?: Partial<{
      [key: string]: string;
    }>;
    addAsyncListener?: (promise: Promise<void>) => void;
  },
};

type PlusnewHostInstance<HostElement, HostTextElement> = PlusnewInstance<HostElement, HostTextElement> &  {
  ref: HostElement;
  type: string;
};

type PlusnewHostTextInstance<HostElement, HostTextElement> = PlusnewInstance<HostElement, HostTextElement> &  {
  ref: HostTextElement;
};

export type IDriver<HostElement, HostTextElement> = {
  element: {
    create: (domInstance: PlusnewHostInstance<HostElement, HostTextElement>) => HostElement;
    remove: (domInstance: PlusnewHostInstance<HostElement, HostTextElement>) => void;
    setAttribute: (
      domInstance: PlusnewHostInstance<HostElement, HostTextElement>,
      attributeName: string,
      attributeValue: any,
    ) => void;
    moveAfterSibling: (
      self: PlusnewHostInstance<HostElement, HostTextElement>,
      previousSiblingInstance:
        | PlusnewHostInstance<HostElement, HostTextElement>
        | PlusnewHostTextInstance<HostElement, HostTextElement>
        | null,
    ) => void;
    appendChildAfterSibling: (
      parentInstance: PlusnewHostInstance<HostElement, HostTextElement> | PlusnewHostInstance<HostElement, HostTextElement>,
      childInstance:
        | PlusnewHostInstance<HostElement, HostTextElement>
        | PlusnewHostTextInstance<HostElement, HostTextElement>,
      previousSiblingInstance:
        | PlusnewHostInstance<HostElement, HostTextElement>
        | PlusnewHostTextInstance<HostElement, HostTextElement>
        | null,
    ) => void;
    elementDidMountHook: (
      domInstance: PlusnewHostInstance<HostElement, HostTextElement>,
    ) => void;
  };

  text: {
    create: (text: string) => HostTextElement;
    remove: (textInstance: PlusnewHostTextInstance<HostElement, HostTextElement>) => void;
    update: (
      textInstance: PlusnewHostTextInstance<HostElement, HostTextElement>,
      newText: string,
    ) => void;

    moveAfterSibling: (
      self: PlusnewHostTextInstance<HostElement, HostTextElement>,
      previousSiblingInstance:
        | PlusnewHostInstance<HostElement, HostTextElement>
        | PlusnewHostTextInstance<HostElement, HostTextElement>
        | null,
    ) => void;
  };

  getRootElement: (rootInstance: PlusnewHostInstance<HostElement, HostTextElement>) => HostElement;
};
