import plusnew, { component, store } from "@plusnew/core/src/index";
import HostInstance from "@plusnew/core/src/instances/types/Host/Instance";
import RootInstance from "@plusnew/core/src/instances/types/Root/Instance";
import driver from "../../";

describe("element handling", () => {
  it("moveAfterSibling", () => {
    expect(() => {
      const rootElement = document.createElement("div");

      const driverInstance = driver(rootElement);

      const renderOptions = {
        portals: {},
        driver: driverInstance,
      };
      const rootInstance = new RootInstance(
        true,
        undefined,
        () => null,
        renderOptions
      );

      const target = new HostInstance(
        <div />,
        rootInstance,
        () => null,
        renderOptions
      );

      rootElement.removeChild(rootElement.childNodes[0]);

      driverInstance.element.moveAfterSibling(
        target,
        new HostInstance(<div />, rootInstance, () => null, renderOptions)
      );
    }).toThrow(new Error("Could not move orphaned node"));
  });

  // To be removed after @plusnew/core update
  it("stub test for dealloc", () => {
    const rootElement = document.createElement("div");

    const local = store(true);
    const clickSpy = jest.fn();

    const MainComponent = component("Component", () => (
      <local.Observer>
        {(localState) => (
          <div>
            {localState && (
              <picture>
                <source src="bar" />
                <img src="foo" onclick={clickSpy} />
              </picture>
            )}
          </div>
        )}
      </local.Observer>
    ));

    plusnew.render(<MainComponent />, { driver: driver(rootElement) });

    expect(rootElement.childNodes.length).toBe(1);
    const divContainer = rootElement.childNodes[0] as HTMLElement;
    expect(divContainer.childNodes.length).toBe(1);
    expect(divContainer.childNodes[0].childNodes.length).toBe(2);

    const imgElement = divContainer.childNodes[0].childNodes[1];
    const sourceElementRemoveSpy = jest.spyOn(
      divContainer.childNodes[0].childNodes[0],
      "remove"
    );
    const imgElementRemoveSpy = jest.spyOn(imgElement, "remove");

    local.dispatch(false);

    expect(divContainer.innerHTML).toBe("");
    expect(rootElement.childNodes.length).toBe(1);
    expect(divContainer.childNodes.length).toBe(0);
    expect(sourceElementRemoveSpy).not.toHaveBeenCalled();
    expect(imgElementRemoveSpy).not.toHaveBeenCalled();

    imgElement.dispatchEvent(new Event("click"));

    expect(clickSpy).not.toHaveBeenCalled();
  });
});
