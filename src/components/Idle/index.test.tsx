import plusnew, { component, store, Store } from "@plusnew/core";
import driver, { Idle } from "../..";

describe("<Idle />", () => {
  let container: HTMLElement;
  let urgentStore: Store<boolean, boolean>;
  let requestIdleCallbackSpy: jasmine.Spy;
  let cancelIdleCallbackSpy: jasmine.Spy;

  beforeEach(() => {
    urgentStore = store(false as boolean, (_state, action: boolean) => action);
    container = document.createElement("div");
    container.innerHTML = "lots of stuff";
    document.body.appendChild(container);
    requestIdleCallbackSpy = spyOn(
      window as any,
      "requestIdleCallback"
    ).and.returnValue("foo");
    cancelIdleCallbackSpy = spyOn(window as any, "cancelIdleCallback");
  });

  describe("with idle callback existing in the browser", () => {
    beforeEach(() => {
      spyOn(Idle.prototype, "hasIdleCallback" as any).and.returnValue(true);
    });

    it("idleCallback is not called when <Idle urgent={true} />", () => {
      const Component = component("Component", () => (
        <Idle urgent={true}>
          <span />
        </Idle>
      ));

      plusnew.render(<Component />, { driver: driver(container) });

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");
      expect(requestIdleCallbackSpy.calls.count()).toBe(0);
      expect(cancelIdleCallbackSpy.calls.count()).toBe(0);
    });

    it("idleCallback is called and canceled when it went to <Idle urgent={true} />", () => {
      const Component = component("Component", () => (
        <urgentStore.Observer>
          {(urgentState) => (
            <Idle urgent={urgentState}>
              <span />
            </Idle>
          )}
        </urgentStore.Observer>
      ));

      plusnew.render(<Component />, { driver: driver(container) });

      expect(container.childNodes.length).toBe(0);
      expect(requestIdleCallbackSpy.calls.count()).toBe(1);
      expect(cancelIdleCallbackSpy.calls.count()).toBe(0);

      urgentStore.dispatch(true);

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");
      expect(requestIdleCallbackSpy.calls.count()).toBe(1);
      expect(cancelIdleCallbackSpy.calls.count()).toBe(1);
      expect(cancelIdleCallbackSpy).toHaveBeenCalledWith("foo");
    });

    it("idleCallback is called and executed, does not get canceled when urgent switches to true", () => {
      const Component = component("Component", () => (
        <urgentStore.Observer>
          {(urgentState) => (
            <Idle urgent={urgentState}>
              <span />
            </Idle>
          )}
        </urgentStore.Observer>
      ));

      plusnew.render(<Component />, { driver: driver(container) });

      expect(container.childNodes.length).toBe(0);
      expect(requestIdleCallbackSpy.calls.count()).toBe(1);
      expect(cancelIdleCallbackSpy.calls.count()).toBe(0);

      requestIdleCallbackSpy.calls.mostRecent().args[0]();

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");

      urgentStore.dispatch(true);

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");
      expect(requestIdleCallbackSpy.calls.count()).toBe(1);
      expect(cancelIdleCallbackSpy.calls.count()).toBe(0);
    });

    it("idle content persists when urgent gets set to false", () => {
      const Component = component("Component", () => (
        <urgentStore.Observer>
          {(urgentState) => (
            <Idle urgent={urgentState}>
              <span />
            </Idle>
          )}
        </urgentStore.Observer>
      ));

      plusnew.render(<Component />, { driver: driver(container) });

      expect(container.childNodes.length).toBe(0);

      urgentStore.dispatch(true);

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");

      urgentStore.dispatch(false);

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");
    });
  });

  describe("without idle callback existing in the browser", () => {
    beforeEach(() => {
      spyOn(Idle.prototype, "hasIdleCallback" as any).and.returnValue(false);
    });

    it("content should be executed immidiatley", () => {
      const Component = component("Component", () => (
        <Idle urgent={false}>
          <span />
        </Idle>
      ));

      plusnew.render(<Component />, { driver: driver(container) });

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");
      expect(requestIdleCallbackSpy.calls.count()).toBe(0);
      expect(cancelIdleCallbackSpy.calls.count()).toBe(0);
    });
  });

  it("check if idlecallback exists", () => {
    expect((Idle.prototype as any).hasIdleCallback()).toBe(
      "requestIdleCallback" in window
    );
  });
});
