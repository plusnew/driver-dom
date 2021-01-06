import plusnew, { component, store } from "@plusnew/core/src/index";
import driver from "./index";

describe("dom handling", () => {
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = "lots of stuff";
    document.body.appendChild(container);
  });

  it("correct handling of acceptCharset", () => {
    const Component = component("Component", () => (
      <form accept-charset="UTF-8" />
    ));
    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLFormElement;

    expect(target.acceptCharset).toBe("UTF-8");
  });

  it("correct handling of readOnly", () => {
    const Component = component("Component", () => (
      <input readonly={true} value="foo" type="text" />
    ));
    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLInputElement;

    expect(target.readOnly).toBe(true);
  });

  it("correct handling of class", () => {
    const Component = component("Component", () => <div class="foo" />);
    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLElement;

    expect(target.className).toBe("foo");
  });

  it("correct handling of htmlFor", () => {
    const Component = component("Component", () => <label for="foo" />);
    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLLabelElement;

    expect(target.htmlFor).toBe("foo");
  });

  it("correct handling of httpEquiv", () => {
    const Component = component("Component", () => (
      <meta http-equiv="refresh" />
    ));
    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLMetaElement;

    expect(target.httpEquiv).toBe("refresh");
  });

  it("correct handling of onclick", () => {
    const local = store(true);
    const clickHandler = jasmine.createSpy("clickSpy");
    const anotherClickHandler = jasmine.createSpy("anotherClickSpy");

    const Component = component("Component", () => (
      <local.Observer>
        {(localState) => (
          <span onclick={localState ? clickHandler : anotherClickHandler} />
        )}
      </local.Observer>
    ));
    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLMetaElement;

    const clickEvent = new Event("click");
    target.dispatchEvent(clickEvent);
    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith(clickEvent);

    local.dispatch(false);

    const anotherClickEvent = new Event("click");
    target.dispatchEvent(anotherClickEvent);

    // The old clickhandler should have been removed, and cant be called again
    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(anotherClickHandler).toHaveBeenCalledTimes(1);
    expect(anotherClickHandler).toHaveBeenCalledWith(anotherClickEvent);
  });

  it("event handling of onclick when nothing was selected before", () => {
    const local = store(false);
    const clickHandler = jasmine.createSpy("clickSpy");

    const Component = component("Component", () => (
      <local.Observer>
        {(localState) => (
          <span onclick={localState ? clickHandler : undefined} />
        )}
      </local.Observer>
    ));
    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLMetaElement;

    local.dispatch(true);

    const clickEvent = new Event("click");
    target.dispatchEvent(clickEvent);
    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith(clickEvent);
  });

  it("correct handling of viewBox", () => {
    const Component = component("Component", () =>
      // <svg viewBox="0 0 100 100" />,
      plusnew.createElement("svg", { viewBox: "0 0 100 100" })
    );
    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as SVGSVGElement;

    expect(target.getAttribute("viewBox")).toBe("0 0 100 100");
  });

  it("replacing children of dom", () => {
    const local = store(true, (_state, action: boolean) => action);
    const MainComponent = component("Component", () => (
      <local.Observer>
        {(state) =>
          state ? (
            <div>
              <span>foo</span>
            </div>
          ) : (
            <div>
              <span>bar</span>
              <span>baz</span>
            </div>
          )
        }
      </local.Observer>
    ));

    plusnew.render(<MainComponent />, { driver: driver(container) });

    expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");

    expect(container.childNodes[0].childNodes.length).toBe(1);
    expect((container.childNodes[0].childNodes[0] as HTMLElement).tagName).toBe(
      "SPAN"
    );
    expect(
      (container.childNodes[0].childNodes[0] as HTMLElement).innerHTML
    ).toBe("foo");

    local.dispatch(false);

    expect(container.childNodes[0].childNodes.length).toBe(2);
    expect((container.childNodes[0].childNodes[0] as HTMLElement).tagName).toBe(
      "SPAN"
    );
    expect(
      (container.childNodes[0].childNodes[0] as HTMLElement).innerHTML
    ).toBe("bar");
    expect((container.childNodes[0].childNodes[1] as HTMLElement).tagName).toBe(
      "SPAN"
    );
    expect(
      (container.childNodes[0].childNodes[1] as HTMLElement).innerHTML
    ).toBe("baz");

    local.dispatch(true);

    expect(container.childNodes[0].childNodes.length).toBe(1);
    expect((container.childNodes[0].childNodes[0] as HTMLElement).tagName).toBe(
      "SPAN"
    );
    expect(
      (container.childNodes[0].childNodes[0] as HTMLElement).innerHTML
    ).toBe("foo");
  });

  it("boolean attributes", () => {
    const local = store(true, (_state, action: boolean) => action);

    const Component = component("Component", () => (
      <local.Observer>
        {(state) => <input type="text" disabled={state} />}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    expect((container.childNodes[0] as HTMLInputElement).tagName).toBe("INPUT");
    expect((container.childNodes[0] as HTMLInputElement).disabled).toBe(
      local.getState()
    );

    local.dispatch(false);

    expect((container.childNodes[0] as HTMLInputElement).disabled).toBe(
      local.getState()
    );

    local.dispatch(true);

    expect((container.childNodes[0] as HTMLInputElement).disabled).toBe(
      local.getState()
    );
  });

  it("plusnew attributes", () => {
    const Component = component("Component", () => <div key="foo" />);

    plusnew.render(<Component />, { driver: driver(container) });

    expect((container.childNodes[0] as HTMLDivElement).tagName).toBe("DIV");
    expect((container.childNodes[0] as any).key).toBe(undefined);
    expect(
      (container.childNodes[0] as HTMLDivElement).getAttribute("key")
    ).toBe(null);
  });

  it("input oninput", () => {
    const local = store("foo", (_state, action: string) => action);

    const Component = component("Component", () => (
      <local.Observer>
        {(state) => (
          <input
            type="text"
            value={state}
            oninput={(evt) => local.dispatch(evt.currentTarget.value)}
          />
        )}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLInputElement;
    expect(target.tagName).toBe("INPUT");
    expect(target.value).toBe("foo");

    const inputEvent = new Event("input");
    target.value = "mep";

    target.dispatchEvent(inputEvent);

    expect(local.getState()).toBe("mep");

    target.value = "anothermep";

    target.dispatchEvent(inputEvent);

    expect(local.getState()).toBe("anothermep");

    local.dispatch("completly other value");

    expect(target.value).toBe("completly other value");
  });

  it("input oninput", () => {
    const local = store("foo", (_state, action: string) => `${action}suffix`);

    const Component = component("Component", () => (
      <local.Observer>
        {(state) => (
          <input
            type="text"
            value={state}
            oninput={(evt) => local.dispatch(evt.currentTarget.value)}
          />
        )}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLInputElement;
    expect(target.tagName).toBe("INPUT");
    expect(target.value).toBe("foo");

    const inputEvent = new Event("input");
    target.value = "mep";
    target.dispatchEvent(inputEvent);

    expect(local.getState()).toBe("mepsuffix");
  });

  it("input oninput", () => {
    const local = store("foo", (_state, _action: string) => "blarg");

    const Component = component("Component", () => (
      <local.Observer>
        {(state) => (
          <input
            type="text"
            value={state}
            oninput={(evt) => local.dispatch(evt.currentTarget.value)}
          />
        )}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const target = container.childNodes[0] as HTMLInputElement;
    expect(target.tagName).toBe("INPUT");
    expect(target.value).toBe("foo");

    const inputEvent = new Event("input");
    target.value = "mep";
    target.dispatchEvent(inputEvent);

    expect(local.getState()).toBe("blarg");

    target.value = "meps";
    target.dispatchEvent(inputEvent);

    expect(local.getState()).toBe("blarg");
  });

  it("removing multiple children one at a time", () => {
    const local = store(0, (_state, action: number) => action);

    const MainComponent = component("Component", () => (
      <local.Observer>
        {(state) => {
          if (state === 0) {
            return (
              <div>
                <span>foo1</span>
                <span>foo2</span>
                <span>foo3</span>
              </div>
            );
          }
          if (state === 1) {
            return (
              <div>
                <span>foo1</span>
                <span>foo2</span>
              </div>
            );
          }

          if (state === 2) {
            return (
              <div>
                <span>foo1</span>
              </div>
            );
          }

          return <div></div>;
        }}
      </local.Observer>
    ));

    plusnew.render(<MainComponent />, { driver: driver(container) });

    const target = container.childNodes[0];

    expect(target.childNodes.length).toBe(3);
    expect((target.childNodes[0] as HTMLElement).tagName).toBe("SPAN");
    expect((target.childNodes[0] as HTMLElement).innerHTML).toBe("foo1");
    expect((target.childNodes[1] as HTMLElement).tagName).toBe("SPAN");
    expect((target.childNodes[1] as HTMLElement).innerHTML).toBe("foo2");
    expect((target.childNodes[2] as HTMLElement).tagName).toBe("SPAN");
    expect((target.childNodes[2] as HTMLElement).innerHTML).toBe("foo3");

    local.dispatch(1);

    expect(target.childNodes.length).toBe(2);
    expect((target.childNodes[0] as HTMLElement).tagName).toBe("SPAN");
    expect((target.childNodes[0] as HTMLElement).innerHTML).toBe("foo1");
    expect((target.childNodes[1] as HTMLElement).tagName).toBe("SPAN");
    expect((target.childNodes[1] as HTMLElement).innerHTML).toBe("foo2");

    local.dispatch(2);

    expect(target.childNodes.length).toBe(1);
    expect((target.childNodes[0] as HTMLElement).tagName).toBe("SPAN");
    expect((target.childNodes[0] as HTMLElement).innerHTML).toBe("foo1");

    local.dispatch(3);

    expect(target.childNodes.length).toBe(0);
  });

  it("adding input without focus ", () => {
    const MainComponent = component("Component", () => (
      <input type="text" autofocus={false} />
    ));

    plusnew.render(<MainComponent />, { driver: driver(container) });

    expect(document.activeElement).not.toBe(container.childNodes[0] as Element);
  });

  it("adding input with focus ", () => {
    const MainComponent = component("Component", () => (
      <input type="text" value="djfngjnfdg" autofocus={true} />
    ));

    plusnew.render(<MainComponent />, { driver: driver(container) });

    expect(document.activeElement).toBe(container.childNodes[0] as Element);
  });

  it("adding nested input with focus ", () => {
    const MainComponent = component("Component", () => (
      <div>
        <input type="text" value="djfngjnfdg" autofocus={true} />
      </div>
    ));

    plusnew.render(<MainComponent />, { driver: driver(container) });

    expect(document.activeElement).toBe(
      container.childNodes[0].childNodes[0] as Element
    );
  });
});
