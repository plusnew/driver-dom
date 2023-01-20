import type {
  IDriver,
  HostInstance,
} from "@plusnew/core/src/interfaces/driver";
import {
  getSpecialNamespace,
  isCheckbox,
  isRadio,
  hasInputEvent,
  isOption,
  isSelect,
} from "./util";

const HOST_INSTANCE_TYPE = "host";

function insertAfter(
  parentElement: Element,
  childElement: Element | Text,
  refChild: Element | Text | null
) {
  if (refChild === null) {
    parentElement.insertBefore(childElement, parentElement.firstChild);
  } else {
    parentElement.insertBefore(childElement, refChild.nextSibling);
  }
}

const removeValues = [undefined, null];

const element: IDriver<Element, Text>["element"] = {
  create: (domInstance) => {
    setNamespace(domInstance);
    if (domInstance.renderOptions.xmlns) {
      return document.createElementNS(
        domInstance.renderOptions.xmlns,
        domInstance.type
      );
    }
    return document.createElement(domInstance.type);
  },
  remove: (domInstance) => {
    domInstance.ref.remove();
  },
  dealloc: (domInstance) => {
    Object.keys(domInstance.props)
      .filter((attributeName) => isEvent(attributeName))
      .forEach((attributeName) =>
        removeEventListener(domInstance, attributeName)
      );
  },
  setAttribute: (domInstance, idlAttributeName, attributeValue) => {
    if (removeValues.includes(attributeValue)) {
      element.unsetAttribute(domInstance, idlAttributeName);
    } else {
      if (idlAttributeName.indexOf(":") === -1) {
        if (isEvent(idlAttributeName)) {
          addEventListener(domInstance, idlAttributeName, attributeValue);
        } else {
          if (attributeValue === false || attributeValue === true) {
            const propertyAttributeName = getPropertyName(idlAttributeName);

            (domInstance.ref as any)[propertyAttributeName] = attributeValue;
          } else if (idlAttributeName === "style") {
            domInstance.ref.setAttribute(
              "style",
              getStylePropsAsAttribute(attributeValue)
            );
          } else if (setAttributeAsProperty(domInstance, idlAttributeName)) {
            const propertyAttributeName = getPropertyName(idlAttributeName);

            // Properties like value or checked, need to be set as a property, not as an attribute
            // If these would be set as an attribute, the value would be ignored
            (domInstance.ref as any)[propertyAttributeName] = attributeValue;
          } else {
            domInstance.ref.setAttribute(idlAttributeName, `${attributeValue}`);
          }
        }
      } else {
        const [namespacePrefix, namespacedidlAttributeName] =
          idlAttributeName.split(":");
        if (namespacePrefix === "xmlns") {
          // @TODO add disallow changing this value
          domInstance.renderOptions = {
            ...domInstance.renderOptions,
            xmlnsPrefixes: {
              ...domInstance.renderOptions.xmlnsPrefixes,
              [namespacedidlAttributeName]: attributeValue,
            },
          };
          domInstance.ref.setAttribute(idlAttributeName, `${attributeValue}`);
        } else {
          if (
            domInstance.renderOptions.xmlnsPrefixes &&
            typeof domInstance.renderOptions.xmlnsPrefixes[namespacePrefix] !==
              undefined
          ) {
            domInstance.ref.setAttributeNS(
              domInstance.renderOptions.xmlnsPrefixes[
                namespacePrefix
              ] as string,
              namespacedidlAttributeName,
              `${attributeValue}`
            );
          } else {
            throw new Error(
              `The namespace prefix ${namespacePrefix} is not defined`
            );
          }
        }
      }
    }
  },
  unsetAttribute: (domInstance, attributeName) => {
    if (isEvent(attributeName)) {
      removeEventListener(domInstance, attributeName);
    } else {
      const idlAttributeName = getPropertyName(attributeName);

      domInstance.ref.removeAttribute(idlAttributeName);
    }
  },
  moveAfterSibling: (self, previousSiblingInstance) => {
    if (self.ref.parentElement) {
      insertAfter(
        self.ref.parentElement,
        self.ref,
        previousSiblingInstance && previousSiblingInstance.ref
      );
    } else {
      throw new Error("Could not move orphaned node");
    }
  },
  appendChildAfterSibling: (
    parentInstance,
    childInstance,
    previousSiblingInstance
  ) => {
    insertAfter(
      parentInstance.ref,
      childInstance.ref,
      previousSiblingInstance && previousSiblingInstance.ref
    );
  },
  elementDidMountHook: (domInstance) => {
    if (hasInputEvent(domInstance.type, domInstance.props)) {
      // WHen an element has input-capabilities, these need to be watched, so that the value of that element can be resettted if needed
      registerInputWatcher(domInstance);
    }

    /**
     * safari is the only browser creating a focus on elements created after time
     * all the other browsers don't do that, that's why this functions sets it manually, after the element is inserted in the dom
     */
    if (
      "autofocus" in domInstance.props &&
      domInstance.props.autofocus === true &&
      domInstance.ref instanceof HTMLInputElement
    ) {
      domInstance.ref.focus();
    }

    setSelectedIfNeeded(domInstance);
  },
};

function addEventListener(
  instance: HostInstance<Element, Text>,
  attributeName: string,
  listener: any
) {
  // Oninput already gets ommitted, because this is a special case handled by registerInputListener
  if (
    (attributeName === "oninput" &&
      hasInputEvent(instance.type, instance.props)) === false
  ) {
    if (instance.props[attributeName]) {
      removeEventListener(instance, attributeName);
    }
    (instance.ref as any).addEventListener(
      getEventName(attributeName),
      listener
    );
  }
}

function removeEventListener(
  instance: HostInstance<Element, Text>,
  attributeName: string
) {
  (instance.ref as Element).removeEventListener(
    getEventName(attributeName),
    (instance.props as any)[attributeName]
  );
}
function registerInputWatcher(instance: HostInstance<Element, Text>) {
  const onchangeWrapper = (evt: Event) => {
    let preventDefault = true;
    let changeKey: "value" | "checked" = "value";
    if (
      isCheckbox(instance.type, instance.props) ||
      isRadio(instance.type, instance.props)
    ) {
      changeKey = "checked";
    }

    const originalSetProp = instance.setProp;
    instance.setProp = (key, value) => {
      if (key === changeKey) {
        // When value property is the same as it is before, the value doesn't need to be set
        if ((evt.target as HTMLInputElement)[changeKey] === value) {
          preventDefault = false;
        } else {
          // If the value got changed, it needs to be set
          preventDefault = true;
        }
      } else {
        // every other property, which is not the one responsible for changing the value, should call the normal setProp behaviour
        originalSetProp.call(instance, key, value);
      }
    };

    if (instance.props.oninput) {
      (instance.props.oninput as EventListener)(evt);
    }

    if (preventDefault === true) {
      ((instance.ref as HTMLInputElement)[changeKey] as any) =
        instance.props[changeKey];
    }

    // When deleting this line, typescript thinks the property wouldn't exist anymore
    // In reality we only remove it from this instance, and the setProp from the prototype-chain is still available
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete instance.setProp;
  };

  (instance.ref as HTMLInputElement).oninput = onchangeWrapper;
}

function isEvent(attributeName: string) {
  return attributeName.slice(0, 2) === "on";
}
function getEventName(attributeName: string) {
  return attributeName.slice(2);
}
/**
 * sets a special namespace, in case self is an svg, so that children will created with correct namespace
 */
function setNamespace(instance: HostInstance<Element, Text>) {
  const currentNamespace =
    (instance.props.xmlns as string) ||
    getSpecialNamespace(instance.type as string) ||
    instance.renderOptions.xmlns;
  if (currentNamespace !== instance.renderOptions.xmlns) {
    instance.renderOptions = {
      ...instance.renderOptions,
      xmlns: currentNamespace,
    };
  }
}

const idlAttributeToPropertyMapping = {
  readonly: "readOnly",
};

function getPropertyName(propertyName: string): string {
  if (propertyName in idlAttributeToPropertyMapping) {
    return (idlAttributeToPropertyMapping as any)[propertyName];
  }
  return propertyName;
}

function setAttributeAsProperty(
  domInstance: HostInstance<Element, Text>,
  keyName: string
): keyName is "checked" | "value" {
  const isCustomElement = domInstance.type.indexOf("-") !== -1;

  if (isCustomElement) {
    return keyName in domInstance.ref;
  } else {
    return (
      domInstance.type === "input" &&
      (keyName === "value" || keyName === "checked")
    );
  }
}

function getStylePropsAsAttribute(style: {
  [styleIndex: string]: string;
}): string {
  return Object.keys(style).reduce(
    (styleString, styleIndex) =>
      `${styleString}${styleIndex}:${style[styleIndex]};`,
    ""
  );
}

/**
 * sets the value of an OPTION-Element
 * looks for the parent select element to set the selected property
 * the select.value is not used, because option elements could be added asynchronously
 * and browsers dont care about that properly
 */
function setSelectedIfNeeded(instance: HostInstance<Element, Text>) {
  if (isOption(instance.type)) {
    const select = instance.findParent((instance) => {
      if (instance.nodeType === HOST_INSTANCE_TYPE) {
        if (isSelect((instance as HostInstance<Element, Text>).type)) {
          return true;
        }
        throw new Error(
          `Nearest dom of OPTION is not a SELECT but a ${(
            instance as HostInstance<Element, Text>
          ).type
            .toString()
            .toUpperCase()}`
        );
      }
      return false;
    });
    if (!select) {
      throw new Error("Could not find SELECT-Element of OPTION");
    }
    instance.setProp(
      "selected",
      instance.props.value ===
        (select as HostInstance<Element, Text>).props.value
    );
  }
}

export default element;
