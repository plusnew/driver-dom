import plusnew, { component, store } from "@plusnew/core/src/index";
import driver from "../index";

describe("firing input events", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = "lots of stuff";
    document.body.appendChild(container);
  });

  it("is oninput called on radio, without revert", () => {
    const local = store("foo", (_state, newValue: string) => newValue);

    const change = jest.fn(
      (evt: Event & { currentTarget: HTMLInputElement }) => {
        local.dispatch(evt.currentTarget.value);
      }
    );

    const Component = component("Component", () => (
      <local.Observer>
        {(state) => (
          <>
            <input
              oninput={change}
              type="radio"
              value="foo"
              checked={state === "foo"}
            >
              Foo
            </input>
            <input
              oninput={change}
              type="radio"
              value="bar"
              checked={state === "bar"}
            >
              Bar
            </input>
          </>
        )}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const [firstRadio, secondRadio] =
      container.childNodes as NodeListOf<HTMLInputElement>;

    expect(firstRadio.checked).toBe(true);
    expect(secondRadio.checked).toBe(false);

    secondRadio.checked = true;
    const event = new CustomEvent("input", { detail: { target: secondRadio } });
    secondRadio.dispatchEvent(event);

    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith(event);
    expect(local.getState()).toBe("bar");
    expect(firstRadio.checked).toBe(false);
    expect(secondRadio.checked).toBe(true);
  });

  it("is oninput called on radio, with revert", () => {
    const local = store("foo", (state, _newValue: string) => state);

    const change = jest.fn(
      (evt: Event & { currentTarget: HTMLInputElement }) => {
        local.dispatch(evt.currentTarget.value);
      }
    );

    const Component = component("Component", () => (
      <local.Observer>
        {(state) => (
          <>
            <input
              oninput={change}
              type="radio"
              value="foo"
              checked={state === "foo"}
            >
              Foo
            </input>
            <input
              oninput={change}
              type="radio"
              value="bar"
              checked={state === "bar"}
            >
              Bar
            </input>
          </>
        )}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const [firstRadio, secondRadio] =
      container.childNodes as NodeListOf<HTMLInputElement>;

    expect(firstRadio.checked).toBe(true);
    expect(secondRadio.checked).toBe(false);

    secondRadio.checked = true;
    const event = new CustomEvent("input", { detail: { target: secondRadio } });
    secondRadio.dispatchEvent(event);

    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith(event);
    expect(local.getState()).toBe("foo");
    expect(firstRadio.checked).toBe(true);
    expect(secondRadio.checked).toBe(false);
  });
});
