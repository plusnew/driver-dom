import plusnew, {
  component,
  store,
  PortalExit,
  PortalEntrance,
} from "@plusnew/core/src";
import driver from "./index";

const htmlNamespace = "http://www.w3.org/1999/xhtml";
const svgNamespace = "http://www.w3.org/2000/svg";

describe("rendering svg components", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = "lots of stuff";
    document.body.appendChild(container);
  });

  it("check if div element has correct namespace", () => {
    const Component = component("Component", () => <div />);

    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes[0].namespaceURI).toBe(htmlNamespace);
  });

  it("check if nested div element has correct namespace", () => {
    const Component = component("Component", () => (
      <span>
        <div />
      </span>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes[0].namespaceURI).toBe(htmlNamespace);
    expect(container.childNodes[0].childNodes[0].namespaceURI).toBe(
      htmlNamespace
    );
  });

  it("check if svg element has correct namespace", () => {
    const Component = component("Component", () => <svg />);

    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes[0].namespaceURI).toBe(svgNamespace);
  });

  it("check if svg element has correct namespace", () => {
    const Component = component("Component", () => <svg xmlns="foo" />);

    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes[0].namespaceURI).toBe("foo");
  });

  it("check if nested svg element has correct namespace", () => {
    const Component = component("Component", () => (
      <span>
        <svg />
      </span>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes[0].namespaceURI).toBe(htmlNamespace);
    expect(container.childNodes[0].childNodes[0].namespaceURI).toBe(
      svgNamespace
    );
  });

  it("check if nested element in svg element has correct namespace", () => {
    const Component = component("Component", () => (
      <svg>
        <g />
      </svg>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes[0].namespaceURI).toBe(svgNamespace);
    expect(container.childNodes[0].childNodes[0].namespaceURI).toBe(
      svgNamespace
    );
  });

  it("check if nested element in svg element has correct namespace", () => {
    const Component = component("Component", () => (
      <svg>
        <foreignObject>
          <div xmlns={htmlNamespace} />
        </foreignObject>
      </svg>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes[0].namespaceURI).toBe(svgNamespace);
    expect(container.childNodes[0].childNodes[0].namespaceURI).toBe(
      svgNamespace
    );
    expect(
      container.childNodes[0].childNodes[0].childNodes[0].namespaceURI
    ).toBe(htmlNamespace);
  });

  it("check if element with renderoption is set to the namespace", () => {
    const Component = component("Component", () => <g />);

    plusnew.render(<Component />, {
      xmlns: svgNamespace,
      driver: driver(container),
    });

    expect(container.childNodes[0].namespaceURI).toBe(svgNamespace);
  });

  it("check if dom element has correct namespace, after replacement from svg", () => {
    const local = store(true);
    const Component = component("Component", () => (
      <local.Observer>
        {(localState) => (localState ? <svg /> : <div />)}
      </local.Observer>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes[0].namespaceURI).toBe(svgNamespace);

    local.dispatch(false);

    expect(container.childNodes[0].namespaceURI).toBe(htmlNamespace);
  });

  it("check if namespace prefix is set correctly", () => {
    const xlinkNamespaceUrl = "http://www.w3.org/1999/xlink";

    const xlinkNamespace = {
      "xmlns:xlink": xlinkNamespaceUrl,
    };

    const xlink = {
      "xlink:href": "someValue",
    };

    const Component = component("Component", () => (
      <svg xmlns={svgNamespace} {...xlinkNamespace}>
        <use {...xlink} />
        {/** we have to use the spread operator, because namespace prefixes are not allowed in jsx */}
      </svg>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    expect(
      (container.childNodes[0] as SVGElement).getAttribute("xmlns:xlink")
    ).toBe(xlinkNamespaceUrl);
    expect(
      (container.childNodes[0].childNodes[0] as SVGUseElement).getAttributeNS(
        xlinkNamespaceUrl,
        "href"
      )
    ).toBe("someValue");
  });

  it("throw exception when namespace prefix is not known", () => {
    const xlink = {
      "xlink:href": "someValue",
    };

    const Component = component("Component", () => (
      <svg xmlns={svgNamespace}>
        <use {...xlink} />
      </svg>
    ));

    expect(() =>
      plusnew.render(<Component />, { driver: driver(container) })
    ).toThrow(new Error("The namespace prefix xlink is not defined"));
  });

  it("correct handling with portals", () => {
    const local = store(false);
    const Component = component("Component", () => (
      <>
        <div>
          <PortalExit name="foo" />
        </div>
        <svg xmlns={svgNamespace}>
          <PortalEntrance name="foo">
            <span />
          </PortalEntrance>
          <local.Observer>{(localState) => localState && <g />}</local.Observer>
        </svg>
      </>
    ));

    plusnew.render(<Component />, { driver: driver(container) });

    const portalExit = container.childNodes[0] as HTMLElement;
    const svg = container.childNodes[1] as SVGElement;

    expect((portalExit.childNodes[0] as HTMLElement).tagName).toBe("SPAN");
    expect((portalExit.childNodes[0] as HTMLElement).namespaceURI).toBe(
      htmlNamespace
    );
    expect(svg.childNodes.length).toBe(0);

    local.dispatch(true);

    expect((portalExit.childNodes[0] as HTMLElement).tagName).toBe("SPAN");
    expect((portalExit.childNodes[0] as HTMLElement).namespaceURI).toBe(
      htmlNamespace
    );
    expect(svg.childNodes.length).toBe(1);
    expect((svg.childNodes[0] as SVGGElement).tagName).toBe("g");
    expect((svg.childNodes[0] as SVGGElement).namespaceURI).toBe(svgNamespace);
  });
});
