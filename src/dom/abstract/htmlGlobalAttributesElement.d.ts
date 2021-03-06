import { truefalse } from "./../types/truefalse";
import { ApplicationElement } from "@plusnew/core/src/interfaces/component";

type htmlGlobalAttributesElement<currentElement> = {
  key?: number | string;
  children?: ApplicationElement | ApplicationElement[];
  onabort?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  onautocomplete?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onautocompleteerror?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onbeforeinput?:
    | ((event: InputEvent & { currentTarget: currentElement }) => void)
    | null;
  onblur?:
    | ((event: FocusEvent & { currentTarget: currentElement }) => void)
    | null;
  oncancel?:
    | ((
        event: AnimationPlaybackEvent & { currentTarget: currentElement }
      ) => void)
    | null;
  oncanplay?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  oncanplaythrough?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onchange?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onclick?:
    | ((event: MouseEvent & { currentTarget: currentElement }) => void)
    | null;
  onclose?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  oncontextmenu?:
    | ((event: PointerEvent & { currentTarget: currentElement }) => void)
    | null;
  oncompositionstart?:
    | ((event: CompositionEvent & { currentTarget: currentElement }) => void)
    | null;
  oncompositionupdate?:
    | ((event: CompositionEvent & { currentTarget: currentElement }) => void)
    | null;
  oncompositionend?:
    | ((event: CompositionEvent & { currentTarget: currentElement }) => void)
    | null;
  oncuechange?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  ondblclick?:
    | ((event: MouseEvent & { currentTarget: currentElement }) => void)
    | null;
  ondrag?:
    | ((event: DragEvent & { currentTarget: currentElement }) => void)
    | null;
  ondragend?:
    | ((event: DragEvent & { currentTarget: currentElement }) => void)
    | null;
  ondragenter?:
    | ((event: DragEvent & { currentTarget: currentElement }) => void)
    | null;
  ondragexit?:
    | ((event: DragEvent & { currentTarget: currentElement }) => void)
    | null;
  ondragleave?:
    | ((event: DragEvent & { currentTarget: currentElement }) => void)
    | null;
  ondragover?:
    | ((event: DragEvent & { currentTarget: currentElement }) => void)
    | null;
  ondragstart?:
    | ((event: DragEvent & { currentTarget: currentElement }) => void)
    | null;
  ondrop?:
    | ((event: DragEvent & { currentTarget: currentElement }) => void)
    | null;
  ondurationchange?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onemptied?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onended?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  onerror?:
    | ((event: ErrorEvent & { currentTarget: currentElement }) => void)
    | null;
  onfocus?:
    | ((event: FocusEvent & { currentTarget: currentElement }) => void)
    | null;
  onfocusin?:
    | ((event: FocusEvent & { currentTarget: currentElement }) => void)
    | null;
  onfocusout?:
    | ((event: FocusEvent & { currentTarget: currentElement }) => void)
    | null;
  oninput?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  oninvalid?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onkeydown?:
    | ((event: KeyboardEvent & { currentTarget: currentElement }) => void)
    | null;
  onkeypress?:
    | ((event: KeyboardEvent & { currentTarget: currentElement }) => void)
    | null;
  onkeyup?:
    | ((event: KeyboardEvent & { currentTarget: currentElement }) => void)
    | null;
  onload?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  onloadeddata?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onloadedmetadata?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onloadstart?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onmousedown?:
    | ((event: MouseEvent & { currentTarget: currentElement }) => void)
    | null;
  onmouseenter?:
    | ((event: MouseEvent & { currentTarget: currentElement }) => void)
    | null;
  onmouseleave?:
    | ((event: MouseEvent & { currentTarget: currentElement }) => void)
    | null;
  onmousemove?:
    | ((event: MouseEvent & { currentTarget: currentElement }) => void)
    | null;
  onmouseout?:
    | ((event: MouseEvent & { currentTarget: currentElement }) => void)
    | null;
  onmouseover?:
    | ((event: MouseEvent & { currentTarget: currentElement }) => void)
    | null;
  onmouseup?:
    | ((event: MouseEvent & { currentTarget: currentElement }) => void)
    | null;
  onmousewheel?:
    | ((event: WheelEvent & { currentTarget: currentElement }) => void)
    | null;
  ontouchstart?:
    | ((event: TouchEvent & { currentTarget: currentElement }) => void)
    | null;
  ontouchmove?:
    | ((event: TouchEvent & { currentTarget: currentElement }) => void)
    | null;
  ontouchend?:
    | ((event: TouchEvent & { currentTarget: currentElement }) => void)
    | null;
  ontouchcancel?:
    | ((event: TouchEvent & { currentTarget: currentElement }) => void)
    | null;
  onpause?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  onplay?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  onplaying?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onprogress?:
    | ((event: ProgressEvent & { currentTarget: currentElement }) => void)
    | null;
  onratechange?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onreset?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  onresize?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onscroll?:
    | ((event: UIEvent & { currentTarget: currentElement }) => void)
    | null;
  onseeked?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onseeking?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onselect?:
    | ((event: UIEvent & { currentTarget: currentElement }) => void)
    | null;
  onshow?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  onsort?: ((event: Event & { currentTarget: currentElement }) => void) | null;
  onstalled?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onsubmit?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onsuspend?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  ontimeupdate?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  ontoggle?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onvolumechange?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onwaiting?:
    | ((event: Event & { currentTarget: currentElement }) => void)
    | null;
  onwheel?:
    | ((event: WheelEvent & { currentTarget: currentElement }) => void)
    | null;
  accesskey?: string | null;
  autocapitalize?:
    | "off"
    | "none"
    | "pn"
    | "sentences"
    | "words"
    | "characters"
    | null;
  class?: string | null;
  contenteditable?: truefalse | null;
  dir?: "ltr" | "rtl" | "auto" | null;
  draggable?: truefalse | null;
  dropzone?: "copy" | "move" | "link" | null;
  hidden?: boolean | null;
  id?: string | null;
  is?: string | null;
  itemid?: string | null;
  itemprop?: string | null;
  itemref?: string | null;
  itemscope?: boolean | null;
  itemtype?: string | null;
  lang?: string | null;
  slot?: string | null;
  spellcheck?: truefalse | null;
  style?: Partial<CSSStyleDeclaration> | null;
  tabindex?: number | null;
  title?: string | null;
  translate?: "yes" | "no" | "" | null;
  xmlns?: string | null;
};

export { htmlGlobalAttributesElement };
