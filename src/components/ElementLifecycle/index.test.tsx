import type { Props } from "@plusnew/core/src/index";
import plusnew, { component, store } from "@plusnew/core/src/index";
import driver, { ElementLifecycle } from "../..";

async function tick(count: number) {
  for (let i = 0; i < count; i += 1) {
    await new Promise<void>((resolve) => resolve());
  }
}

describe("<ElementLifecycle />", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = "lots of stuff";
    document.body.appendChild(container);
  });

  describe("elementDidMount", () => {
    describe("flat", () => {
      it("elementDidMount gets called with node", () => {
        const didMountSpy = jest.fn((_element: Element) => null);
        const Component = component("Component", () => (
          <ElementLifecycle elementDidMount={didMountSpy}>
            <div />
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(didMountSpy).toHaveBeenCalledTimes(1);
        expect(didMountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );
      });

      it("elementDidMount gets called with nodes", () => {
        const didMountSpy = jest.fn((_element: Element) => null);
        const Component = component("Component", () => (
          <ElementLifecycle elementDidMount={didMountSpy}>
            <div />
            <span />
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(2);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect((container.childNodes[1] as HTMLElement).tagName).toBe("SPAN");
        expect(didMountSpy).toHaveBeenCalledTimes(2);
        expect(didMountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );
        expect(didMountSpy).toHaveBeenCalledWith(
          container.childNodes[1] as Element
        );
      });
    });

    describe("nested", () => {
      it("elementDidMount gets called with node", () => {
        const didMountSpy = jest.fn((_element: Element) => null);
        const Component = component("Component", () => (
          <ElementLifecycle elementDidMount={didMountSpy}>
            <div>
              <div />
            </div>
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(didMountSpy).toHaveBeenCalledTimes(1);
        expect(didMountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );
      });

      it("elementDidMount gets called with nodes", () => {
        const didMountSpy = jest.fn((_element: Element) => null);
        const Component = component("Component", () => (
          <ElementLifecycle elementDidMount={didMountSpy}>
            <div>
              <div />
            </div>
            <span>
              <span />
            </span>
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(2);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect((container.childNodes[1] as HTMLElement).tagName).toBe("SPAN");
        expect(didMountSpy).toHaveBeenCalledTimes(2);
        expect(didMountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );
        expect(didMountSpy).toHaveBeenCalledWith(
          container.childNodes[1] as Element
        );
      });
    });
  });

  describe("elementWillUnmount", () => {
    describe("flat", () => {
      it("elementWillUnmount gets called with node", async () => {
        const local = store(true, (_state, action: boolean) => action);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let promiseResolve = () => {};
        const unmountPromise = new Promise<void>((resolve) => {
          promiseResolve = resolve;
        });
        const willUnmountSpy = jest.fn((_element: Element) => unmountPromise);
        const Component = component("Component", () => (
          <ElementLifecycle elementWillUnmount={willUnmountSpy}>
            <local.Observer>{(state) => state && <div />}</local.Observer>
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpy).toHaveBeenCalledTimes(0);

        local.dispatch(false);

        expect(willUnmountSpy).toHaveBeenCalledTimes(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );
        expect(willUnmountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );

        await tick(1);
        promiseResolve();
        await tick(1);

        expect(container.childNodes.length).toBe(0);
      });

      it("elementWillUnmount gets called with nodes", async () => {
        const local = store(true, (_state, action: boolean) => action);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let promiseResolve = () => {};
        const unmountPromise = new Promise<void>((resolve) => {
          promiseResolve = resolve;
        });
        const willUnmountSpy = jest.fn((_element: Element) => unmountPromise);
        const Component = component("Component", () => (
          <ElementLifecycle elementWillUnmount={willUnmountSpy}>
            <local.Observer>{(state) => state && <div />}</local.Observer>
            <local.Observer>{(state) => state && <span />}</local.Observer>
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(2);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect((container.childNodes[1] as HTMLElement).tagName).toBe("SPAN");
        expect(willUnmountSpy).toHaveBeenCalledTimes(0);

        local.dispatch(false);

        expect(willUnmountSpy).toHaveBeenCalledTimes(2);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect((container.childNodes[1] as HTMLElement).tagName).toBe("SPAN");
        expect(willUnmountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );
        expect(willUnmountSpy).toHaveBeenCalledWith(
          container.childNodes[1] as Element
        );

        await tick(1);
        promiseResolve();
        await tick(1);

        expect(container.childNodes.length).toBe(0);
      });
    });

    describe("nested", () => {
      it("elementWillUnmount gets called with node", async () => {
        const local = store(true, (_state, action: boolean) => action);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let promiseResolve = () => {};
        const unmountPromise = new Promise<void>((resolve) => {
          promiseResolve = resolve;
        });
        const willUnmountSpy = jest.fn((_element: Element) => unmountPromise);
        const Component = component("Component", () => (
          <ElementLifecycle elementWillUnmount={willUnmountSpy}>
            <local.Observer>
              {(state) =>
                state && (
                  <div>
                    <div />
                  </div>
                )
              }
            </local.Observer>
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpy).toHaveBeenCalledTimes(0);

        local.dispatch(false);

        expect(willUnmountSpy).toHaveBeenCalledTimes(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );

        await tick(1);
        promiseResolve();
        await tick(1);

        expect(container.childNodes.length).toBe(0);
      });

      it("elementWillUnmount gets called with nodes", async () => {
        const local = store(true, (_state, action: boolean) => action);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let promiseResolve = () => {};
        const unmountPromise = new Promise<void>((resolve) => {
          promiseResolve = resolve;
        });
        const willUnmountSpy = jest.fn((_element: Element) => unmountPromise);
        const Component = component("Component", () => (
          <ElementLifecycle elementWillUnmount={willUnmountSpy}>
            <local.Observer>
              {(state) =>
                state && (
                  <div>
                    <div />
                  </div>
                )
              }
            </local.Observer>

            <local.Observer>
              {(state) =>
                state && (
                  <span>
                    <span />
                  </span>
                )
              }
            </local.Observer>
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(2);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect((container.childNodes[1] as HTMLElement).tagName).toBe("SPAN");
        expect(willUnmountSpy).toHaveBeenCalledTimes(0);

        local.dispatch(false);

        expect(willUnmountSpy).toHaveBeenCalledTimes(2);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect((container.childNodes[1] as HTMLElement).tagName).toBe("SPAN");
        expect(willUnmountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );
        expect(willUnmountSpy).toHaveBeenCalledWith(
          container.childNodes[1] as Element
        );

        await tick(1);
        promiseResolve();
        await tick(1);

        expect(container.childNodes.length).toBe(0);
      });

      it("elementWillUnmounts gets called with node after the parent gets resolved", async () => {
        const local = store(true, (_state, action: boolean) => action);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let promiseResolveParent = () => {};
        const unmountPromiseParent = new Promise<void>((resolve) => {
          promiseResolveParent = resolve;
        });
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let promiseResolveChild = () => {};
        const unmountPromiseChild = new Promise<void>((resolve) => {
          promiseResolveChild = resolve;
        });
        const willUnmountSpyParent = jest.fn(
          (_element: Element) => unmountPromiseParent
        );

        const willUnmountSpyChild = jest.fn(
          (_element: Element) => unmountPromiseChild
        );

        const Component = component("Component", () => (
          <ElementLifecycle elementWillUnmount={willUnmountSpyParent}>
            <ElementLifecycle elementWillUnmount={willUnmountSpyChild}>
              <local.Observer>
                {(state) =>
                  state && (
                    <div>
                      <div />
                    </div>
                  )
                }
              </local.Observer>
            </ElementLifecycle>
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpyParent).toHaveBeenCalledTimes(0);
        expect(willUnmountSpyChild).toHaveBeenCalledTimes(0);

        local.dispatch(false);

        expect(willUnmountSpyParent).toHaveBeenCalledTimes(1);
        expect(willUnmountSpyChild).toHaveBeenCalledTimes(0);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpyParent).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );

        await tick(1);
        promiseResolveParent();
        await tick(1);

        expect(willUnmountSpyParent).toHaveBeenCalledTimes(1);
        expect(willUnmountSpyChild).toHaveBeenCalledTimes(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpyChild).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );

        await tick(1);
        promiseResolveChild();
        await tick(1);

        expect(container.childNodes.length).toBe(0);
      });

      it("elementWillUnmounts gets called synchronosly", async () => {
        const local = store(true, (_state, action: boolean) => action);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let promiseResolveChild = () => {};
        const unmountPromiseChild = new Promise<void>((resolve) => {
          promiseResolveChild = resolve;
        });
        const willUnmountSpyParent = jest.fn((_element: Element) => {}); // eslint-disable-line @typescript-eslint/no-empty-function

        const willUnmountSpyChild = jest.fn(
          (_element: Element) => unmountPromiseChild
        );

        const Component = component("Component", () => (
          <ElementLifecycle elementWillUnmount={willUnmountSpyParent}>
            <ElementLifecycle elementWillUnmount={willUnmountSpyChild}>
              <local.Observer>
                {(state) =>
                  state && (
                    <div>
                      <div />
                    </div>
                  )
                }
              </local.Observer>
            </ElementLifecycle>
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpyParent).toHaveBeenCalledTimes(0);
        expect(willUnmountSpyChild).toHaveBeenCalledTimes(0);

        local.dispatch(false);

        expect(willUnmountSpyParent).toHaveBeenCalledTimes(1);
        expect(willUnmountSpyChild).toHaveBeenCalledTimes(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpyParent).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );

        await tick(1);
        promiseResolveChild();
        await tick(1);

        expect(container.childNodes.length).toBe(0);
      });

      it("elementWillUnmounts gets called even with nested Animate", async () => {
        const local = store(true, (_state, action: boolean) => action);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let promiseResolveChild = () => {};
        const unmountPromiseChild = new Promise<void>((resolve) => {
          promiseResolveChild = resolve;
        });
        const willUnmountSpyChild = jest.fn(
          (_element: Element) => unmountPromiseChild
        );

        const Component = component("Component", () => (
          <ElementLifecycle>
            <ElementLifecycle elementWillUnmount={willUnmountSpyChild}>
              <local.Observer>
                {(state) =>
                  state && (
                    <div>
                      <div />
                    </div>
                  )
                }
              </local.Observer>
            </ElementLifecycle>
          </ElementLifecycle>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpyChild).toHaveBeenCalledTimes(0);

        local.dispatch(false);

        expect(willUnmountSpyChild).toHaveBeenCalledTimes(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");

        await tick(1);
        promiseResolveChild();
        await tick(1);

        expect(container.childNodes.length).toBe(0);
      });

      it("elementWillUnmount gets called with node, when parent-fragment gets removed", async () => {
        const local = store(true, (_state, action: boolean) => action);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let promiseResolve = () => {};
        const unmountPromise = new Promise<void>((resolve) => {
          promiseResolve = resolve;
        });
        const willUnmountSpy = jest.fn((_element: Element) => unmountPromise);
        const Component = component("Component", () => (
          <>
            <local.Observer>
              {(state) =>
                state && (
                  <>
                    <ElementLifecycle elementWillUnmount={willUnmountSpy}>
                      <div />
                    </ElementLifecycle>
                  </>
                )
              }
            </local.Observer>
          </>
        ));

        plusnew.render(<Component />, { driver: driver(container) });

        expect(container.childNodes.length).toBe(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpy).toHaveBeenCalledTimes(0);

        local.dispatch(false);

        expect(willUnmountSpy).toHaveBeenCalledTimes(1);
        expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
        expect(willUnmountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );
        expect(willUnmountSpy).toHaveBeenCalledWith(
          container.childNodes[0] as Element
        );

        await tick(1);
        promiseResolve();
        await tick(1);

        expect(container.childNodes.length).toBe(0);
      });
    });

    it("elementWillUnmount gets called with node, when parent-component gets removed", async () => {
      const local = store(true, (_state, action: boolean) => action);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      let promiseResolve = () => {};
      const unmountPromise = new Promise<void>((resolve) => {
        promiseResolve = resolve;
      });
      const willUnmountSpy = jest.fn((_element: Element) => unmountPromise);

      const ProxyComponent = component(
        "ProxyComponent",
        (Props: Props<{ children: any }>) => (
          <Props>{(props) => props.children}</Props>
        )
      );

      const Component = component("Component", () => (
        <>
          <local.Observer>
            {(state) =>
              state && (
                <ProxyComponent>
                  <ElementLifecycle elementWillUnmount={willUnmountSpy}>
                    <div />
                  </ElementLifecycle>
                </ProxyComponent>
              )
            }
          </local.Observer>
        </>
      ));

      plusnew.render(<Component />, { driver: driver(container) });

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
      expect(willUnmountSpy).toHaveBeenCalledTimes(0);

      local.dispatch(false);

      expect(willUnmountSpy).toHaveBeenCalledTimes(1);
      expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");
      expect(willUnmountSpy).toHaveBeenCalledWith(
        container.childNodes[0] as Element
      );
      expect(willUnmountSpy).toHaveBeenCalledWith(
        container.childNodes[0] as Element
      );

      await tick(1);
      promiseResolve();
      await tick(1);

      expect(container.childNodes.length).toBe(0);
    });

    it("elementWillUnmount gets called with node, when parent-dom gets removed, but parent doesnt wait to remove element", async () => {
      const local = store(true, (_state, action: boolean) => action);
      const willUnmountSpy = jest.fn(
        (_element: Element) => new Promise<void>((resolve) => resolve())
      );

      const Component = component("Component", () => (
        <>
          <local.Observer>
            {(state) =>
              state && (
                <span>
                  <ElementLifecycle elementWillUnmount={willUnmountSpy}>
                    <div />
                  </ElementLifecycle>
                </span>
              )
            }
          </local.Observer>
        </>
      ));

      plusnew.render(<Component />, { driver: driver(container) });

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLElement).tagName).toBe("SPAN");
      expect(
        (container.childNodes[0].childNodes[0] as HTMLElement).tagName
      ).toBe("DIV");
      expect(willUnmountSpy).toHaveBeenCalledTimes(0);

      local.dispatch(false);

      expect(willUnmountSpy).toHaveBeenCalledTimes(1);
      expect(container.childNodes.length).toBe(0);
    });

    it("removal works, without error", async () => {
      const local = store(true, (_state, action: boolean) => action);
      const Component = component("Component", () => (
        <ElementLifecycle elementWillUnmount={() => Promise.resolve()}>
          <ElementLifecycle>
            <local.Observer>{(state) => state && <div />}</local.Observer>
          </ElementLifecycle>
        </ElementLifecycle>
      ));

      plusnew.render(<Component />, { driver: driver(container) });

      expect(container.childNodes.length).toBe(1);
      expect((container.childNodes[0] as HTMLElement).tagName).toBe("DIV");

      local.dispatch(false);

      await tick(1);

      expect(container.childNodes.length).toBe(0);
    });
  });
});
