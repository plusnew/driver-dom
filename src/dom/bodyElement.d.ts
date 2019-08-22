import { htmlGlobalAttributesElement } from './abstract/htmlGlobalAttributesElement';


type bodyElement = htmlGlobalAttributesElement<HTMLBodyElement> & {
  onafterprint?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onbeforeprint?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onbeforeunload?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onblur?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onerror?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onfocus?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onhashchange?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onlanguagechange?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onload?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onmessage?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onoffline?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  ononline?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onpopstate?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onredo?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onresize?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onstorage?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onundo?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
  onunload?: ((event: Event & { currentTarget: HTMLBodyElement }) => void) | null;
};

export { bodyElement };
