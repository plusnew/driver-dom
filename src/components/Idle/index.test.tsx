import type { Store } from "@plusnew/core/src/index";
import plusnew, { component, store } from "@plusnew/core/src/index";
import driver, { Idle } from "../..";

describe("<Idle />", () => {
  let container: HTMLElement;
  let urgentStore: Store<boolean, boolean>;

  beforeEach(() => {
    urgentStore = store(false as boolean, (_state, action: boolean) => action);
    container = document.createElement("div");
    container.innerHTML = "lots of stuff";
    document.body.appendChild(container);
  });

  describe("with idle callback existing in the browser", () => {
    let requestIdleCallbackSpy: jest.SpyInstance;
    let cancelIdleCallbackSpy: jest.SpyInstance;

    beforeEach(() => {
      requestIdleCallbackSpy = jest
        .spyOn(window as any, "requestIdleCallback")
        .mockImplementation(() => "foo");
      jest
        .spyOn(Idle.prototype, "hasIdleCallback" as any)
        .mockImplementation(() => true);

      cancelIdleCallbackSpy = jest.spyOn(window as any, "cancelIdleCallback");
    });

    afterEach(() => {
      jest.resetAllMocks();
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
      expect(requestIdleCallbackSpy).toHaveBeenCalledTimes(0);
      expect(cancelIdleCallbackSpy).toHaveBeenCalledTimes(0);
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
      expect(requestIdleCallbackSpy).toHaveBeenCalledTimes(1);
      expect(cancelIdleCallbackSpy).toHaveBeenCalledTimes(0);

      urgentStore.dispatch(true);

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");
      expect(requestIdleCallbackSpy).toHaveBeenCalledTimes(1);
      expect(cancelIdleCallbackSpy).toHaveBeenCalledTimes(1);
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
      expect(requestIdleCallbackSpy).toHaveBeenCalledTimes(1);
      expect(cancelIdleCallbackSpy).toHaveBeenCalledTimes(0);

      requestIdleCallbackSpy.mock.calls[
        requestIdleCallbackSpy.mock.calls.length - 1
      ][0]();

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");

      urgentStore.dispatch(true);

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLSpanElement).tagName).toBe("SPAN");
      expect(requestIdleCallbackSpy).toHaveBeenCalledTimes(1);
      expect(cancelIdleCallbackSpy).toHaveBeenCalledTimes(0);
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
    let requestIdleCallbackSpy: jest.SpyInstance;
    let cancelIdleCallbackSpy: jest.SpyInstance;

    beforeEach(() => {
      requestIdleCallbackSpy = jest
        .spyOn(window as any, "requestIdleCallback")
        .mockImplementation(() => "foo");

      cancelIdleCallbackSpy = jest.spyOn(window as any, "cancelIdleCallback");
    });

    afterEach(() => {
      jest.resetAllMocks();
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
      expect(requestIdleCallbackSpy).toHaveBeenCalledTimes(0);
      expect(cancelIdleCallbackSpy).toHaveBeenCalledTimes(0);
    });
  });

  xit("check if idlecallback exists", () => {
    expect((Idle.prototype as any).hasIdleCallback.toString()).toBe("");

    expect((Idle.prototype as any).hasIdleCallback()).toBe(
      "requestIdleCallback" in window
    );
  });
});
