import plusnew, { component, store } from "@plusnew/core/src/index";
import driver from "../index";

describe("span", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = "lots of stuff";
    document.body.appendChild(container);
  });

  it("firing click events, and removing them", () => {
    const click = jasmine.createSpy("click");
    const local = store<typeof click | undefined>(click);
    const Component = component("Component", () => (
      <local.Observer>
        {(localState) => <span onclick={localState} />}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const span = container.childNodes[0] as HTMLSpanElement;

    const event = new CustomEvent("click", { detail: { target: span } });
    span.dispatchEvent(event);

    expect(click).toHaveBeenCalledWith(event);

    local.dispatch(undefined);
    span.dispatchEvent(event);

    expect(click).toHaveBeenCalledTimes(1);
  });

  it("firing click events, and replacing them", () => {
    const click = jasmine.createSpy("click");
    const anotherClick = jasmine.createSpy("anotherClick");
    const local = store<typeof click>(click);
    const Component = component("Component", () => (
      <local.Observer>
        {(localState) => <span onclick={localState} />}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const span = container.childNodes[0] as HTMLSpanElement;

    const event = new CustomEvent("click", { detail: { target: span } });
    span.dispatchEvent(event);

    expect(click).toHaveBeenCalledWith(event);
    expect(click).toHaveBeenCalledTimes(1);
    expect(anotherClick).toHaveBeenCalledTimes(0);

    local.dispatch(anotherClick);
    span.dispatchEvent(event);

    expect(click).toHaveBeenCalledTimes(1);
    expect(anotherClick).toHaveBeenCalledTimes(1);
    expect(anotherClick).toHaveBeenCalledWith(event);
  });
});
