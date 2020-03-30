import "@plusnew/core";
import RootInstance from "@plusnew/core/src/instances/types/Root/Instance";
import TextInstance from "@plusnew/core/src/instances/types/Text/Instance";
import driver from "../../";

describe("text handling", () => {
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

      const target = new TextInstance(
        "foo",
        rootInstance,
        () => null,
        renderOptions
      );

      rootElement.removeChild(rootElement.childNodes[0]);

      driverInstance.text.moveAfterSibling(
        target,
        new TextInstance("bar", rootInstance, () => null, renderOptions)
      );
    }).toThrow(new Error("Could not move orphaned node"));
  });
});
