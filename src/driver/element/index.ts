import { IDriver } from '@plusnew/core/dist/src/interfaces/driver';
import DomInstance from '@plusnew/core/dist/src/instances/types/Dom/Instance';
import { getSpecialNamespace } from './util';

function insertAfter(parentElement: Element, childElement: Element | Text, refChild: Element | Text | null) {
  if (refChild === null) {
    parentElement.insertBefore(childElement, parentElement.firstChild);
  } else {
    parentElement.insertBefore(childElement, refChild.nextSibling);
  }
}

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
    domInstance.ref.setAttribute(idlAttributeName, attributeValue);

    if (idlAttributeName.indexOf(':') === -1) {
      domInstance.ref.setAttribute(idlAttributeName, `${attributeValue}`);
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
  },
  unsetAttribute: (domInstance, attributeName) => {

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

  },
};

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
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
};

function getIDLAttributeName(propertyName: string): string {
  if (propertyToIDLMapping.hasOwnProperty(propertyName)) {
    return (propertyToIDLMapping as any)[propertyName];
  }
  return propertyName;
}

//
// /**
//  * safari is the only browser creating a focus on elements created after time
//  * all the other browsers don't do that, that's why this functions sets it manually, after the element is inserted in the dom
//  */
// function setAutofocusIfNeeded(instance: DomInstance<Element, Text>) {
//   if (instance.props.autofocus === true) {
//     (instance.ref as any).focus();
//   }
// }
//
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
