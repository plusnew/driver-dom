import plusnew, { component, store } from "@plusnew/core/src/index";
import driver from "../index";

describe("firing onchange events", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = "lots of stuff";
    document.body.appendChild(container);
  });

  it("is onchange called on textarea, without revert", () => {
    const local = store("foo", (_state, newValue: string) => newValue);

    const change = jest.fn(
      (evt: Event & { currentTarget: HTMLTextAreaElement }) => {
        local.dispatch(evt.currentTarget.value);
      }
    );

    const Component = component("Component", () => (
      <local.Observer>
        {(state) => <textarea oninput={change} value={state} />}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const textarea = container.childNodes[0] as HTMLTextAreaElement;

    expect(textarea.value).toBe("foo");

    textarea.value = "bar";
    const event = new CustomEvent("input", { detail: { target: textarea } });
    textarea.dispatchEvent(event);

    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith(event);
    expect(local.getState()).toBe("bar");
    expect(textarea.value).toBe("bar");
  });

  it("is onchange called on textarea, with revert", () => {
    const local = store("foo", (state, _newValue: string) => state);

    const change = jest.fn(
      (evt: Event & { currentTarget: HTMLTextAreaElement }) => {
        local.dispatch(evt.currentTarget.value);
      }
    );

    const Component = component("Component", () => (
      <local.Observer>
        {(state) => <textarea oninput={change} value={state} />}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const textarea = container.childNodes[0] as HTMLTextAreaElement;

    expect(textarea.value).toBe("foo");

    textarea.value = "bar";
    const event = new CustomEvent("input", { detail: { target: textarea } });
    textarea.dispatchEvent(event);

    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith(event);
    expect(local.getState()).toBe("foo");
    expect(textarea.value).toBe("foo");
  });
});
