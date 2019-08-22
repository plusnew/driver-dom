import { IDriver } from '@plusnew/core/dist/src/interfaces/driver';
import DomInstance from '@plusnew/core/dist/src/instances/types/Dom/Instance';
import { getSpecialNamespace, isCheckbox, isRadio, hasInputEvent } from './util';

function insertAfter(parentElement: Element, childElement: Element | Text, refChild: Element | Text | null) {
  if (refChild === null) {
    parentElement.insertBefore(childElement, parentElement.firstChild);
  } else {
    parentElement.insertBefore(childElement, refChild.nextSibling);
  }
}

const removeValues = [undefined, null];

const element: IDriver<Element, Text>['element'] = {
  create: (domInstance) => {
    setNamespace(domInstance);
    if (domInstance.renderOptions.xmlns) {
      return document.createElementNS(domInstance.renderOptions.xmlns, domInstance.type);
    }
    return document.createElement(domInstance.type);
  },
  remove: (domInstance) => {
    domInstance.ref.remove();
  },
  setAttribute: (domInstance, attributeName, attributeValue) => {
    const idlAttributeName = getIDLAttributeName(attributeName);

    if (removeValues.includes(attributeValue)) {
      element.unsetAttribute(domInstance, attributeName);
    } else {
      if (idlAttributeName.indexOf(':') === -1) {
        if (isEvent(attributeName)) {
          registerEventListener(domInstance, attributeName, attributeValue);
        } else {
          if (attributeValue === false || attributeValue === true) {
            (domInstance.ref as any)[attributeName] = attributeValue;
          } else if (attributeName === 'style') {
            domInstance.ref.setAttribute('style', getStylePropsAsAttribute(attributeValue));
          } else if (setAttributeAsProperty(attributeName)) {
            // Properties like value or checked, need to be set as a property, not as an attribute
            // If these would be set as an attribute, the value would be ignored
            (domInstance.ref as any)[attributeName] = attributeValue;
          } else {
            domInstance.ref.setAttribute(idlAttributeName, `${attributeValue}`);
          }
        }
      } else {
        const [namespacePrefix, namespacedidlAttributeName] = idlAttributeName.split(':');
        if (namespacePrefix === 'xmlns') {
          // @TODO add disallow changing this value
          domInstance.renderOptions = {
            ...domInstance.renderOptions,
            xmlnsPrefixes: {
              ...domInstance.renderOptions.xmlnsPrefixes,
              [namespacedidlAttributeName]: attributeValue,
            },
          };
        } else {
          if (domInstance.renderOptions.xmlnsPrefixes && typeof domInstance.renderOptions.xmlnsPrefixes[namespacePrefix] !== undefined) {
            domInstance.ref.setAttributeNS(domInstance.renderOptions.xmlnsPrefixes[namespacePrefix] as string, namespacedidlAttributeName, `${attributeValue}`);
          } else {
            throw new Error(`The namespace prefix ${namespacePrefix} is not defined`);
          }
        }
      }
    }
  },
  unsetAttribute: (domInstance, attributeName) => {
    if (isEvent(attributeName)) {
      (domInstance.ref as any)[attributeName] = null;
    } else {
      const idlAttributeName = getIDLAttributeName(attributeName);

      domInstance.ref.removeAttribute(idlAttributeName);
    }
  },
  moveAfterSibling: (self, previousSiblingInstance) => {
    if (self.ref.parentElement) {
      insertAfter(self.ref.parentElement, self.ref, previousSiblingInstance && previousSiblingInstance.ref);
    } else {
      throw new Error('Could not move orphaned node');
    }
  },
  appendChildAfterSibling: (parentInstance, childInstance, previousSiblingInstance) => {
    insertAfter(parentInstance.ref, childInstance.ref, previousSiblingInstance && previousSiblingInstance.ref);
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
    if ('autofocus' in domInstance.props && domInstance.props.autofocus === true && domInstance.ref instanceof HTMLInputElement) {
      domInstance.ref.focus();
    }
  },
};

function registerEventListener(instance: DomInstance<Element, Text>, eventName: string, listener: any) {

  // Oninput already gets ommitted, because this is a special case handled by registerInputListener
  if ((eventName === 'oninput' && hasInputEvent(instance.type, instance.props)) === false) {
    (instance.ref as any)[eventName] = listener;
  }
}

function registerInputWatcher(instance: DomInstance<Element, Text>) {
  const onchangeWrapper = (evt: Event) => {
    let preventDefault = true;
    let changeKey: 'value' | 'checked' = 'value';
    if (isCheckbox(instance.type, instance.props) || isRadio(instance.type, instance.props)) {
      changeKey = 'checked';
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
      ((instance.ref as HTMLInputElement)[changeKey] as any) = instance.props[changeKey];
    }

    delete instance.setProp;
  };

  (instance.ref as HTMLInputElement).oninput = onchangeWrapper;
}

function isEvent(attributeName: string) {
  return attributeName.slice(0, 2) === 'on';
}

/**
 * sets a special namespace, in case self is an svg, so that children will created with correct namespace
 */
function setNamespace(instance: DomInstance<Element, Text>) {
  const currentNamespace = instance.props.xmlns as string || getSpecialNamespace(instance.type as string) || instance.renderOptions.xmlns;
  if (currentNamespace !== instance.renderOptions.xmlns) {
    instance.renderOptions = {
      ...instance.renderOptions,
      xmlns: currentNamespace,
    };
  }
}

const propertyToIDLMapping = {
  acceptCharset: 'accept-charset',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
};

function getIDLAttributeName(propertyName: string): string {
  if (propertyToIDLMapping.hasOwnProperty(propertyName)) {
    return (propertyToIDLMapping as any)[propertyName];
  }
  return propertyName;
}

function setAttributeAsProperty(keyName: string): keyName is 'checked' | 'value' {
  return keyName === 'value' || keyName === 'checked';
}

function getStylePropsAsAttribute(style: {[styleIndex: string]: string}): string {
  return Object.keys(style).reduce((styleString, styleIndex) => `${styleString}${styleIndex}:${style[styleIndex]};`, '');
}
// /**
//  * sets the value of an OPTION-Element
//  * looks for the parent select element to set the selected property
//  * the select.value is not used, because option elements could be added asynchronously
//  * and browsers dont care about that properly
//  */
// function setSelectedIfNeeded(instance: DomInstance<Element, Text>) {
//   if (isOption(instance.type)) {
//     const select = instance.findParent(instance.parentInstance, (instance) => {
//       if (instance instanceof DomInstance) {
//         if (isSelect(instance.type)) {
//           return true;
//         }
//         throw new Error(`Nearest dom of OPTION is not a SELECT but a ${instance.type.toString().toUpperCase()}`);
//       }
//       return false;
//     });
//
//     if (!select) {
//       throw new Error('Could not find SELECT-ELEMENT of OPTION');
//     }
//     instance.setProp('selected', instance.props.value === (select as DomInstance<HostElement, HostTextElement>).props.value);
//   }
// }
//
export default element;
