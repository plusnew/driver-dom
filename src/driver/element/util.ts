import { props } from '@plusnew/core/src/interfaces/component';
import { PlusnewElement } from '@plusnew/core/src/PlusnewAbstractElement';

export function isInputElement(type: PlusnewElement, _props: props) {
  return type === 'input';
}

export function isTextArea(type: PlusnewElement) {
  return type === 'textarea';
}

export function isCheckbox(type: PlusnewElement, props: props) {
  return isInputElement(type, props) && props.type === 'checkbox';
}

export function isRadio(type: PlusnewElement, props: props) {
  return isInputElement(type, props) && props.type === 'radio';
}

export function isSelect(type: PlusnewElement) {
  return type === 'select';
}

export function isOption(type: PlusnewElement) {
  return type === 'option';
}

export function hasInputEvent(type: PlusnewElement, props: props) {
  return isInputElement(type, props) || isTextArea(type) || isSelect(type);
}

const svgNamespace = 'http://www.w3.org/2000/svg';

export function getSpecialNamespace(elementName: string): void | string {
  if (elementName === 'svg') {
    return svgNamespace;
  }
}
