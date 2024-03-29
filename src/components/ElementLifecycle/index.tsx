import type { ComponentContainer } from "@plusnew/core/src/index";
import plusnew, { component } from "@plusnew/core/src/index";
import type Instance from "@plusnew/core/src/instances/types/Component/Instance";

type props = {
  elementDidMount?: (element: Element) => void;
  elementWillUnmount?: (element: Element) => Promise<any> | void;
  children: any;
};

const ElementLifecycle: ComponentContainer<props, Element, Text> = component(
  "ElementLifecycle",
  (Props, instance) => {
    return (
      <Props>
        {(props) => {
          instance.elementDidMount = (element: Element) => {
            (
              instance.parentInstance as Instance<props, Element, Text>
            ).elementDidMount(element);
            if (props.elementDidMount) {
              props.elementDidMount(element);
            }
          };

          instance.elementWillUnmount = (
            element: Element
          ): Promise<any> | void => {
            let parentWait: void | Promise<any> = undefined;
            parentWait = (
              instance.parentInstance as Instance<props, Element, Text>
            ).elementWillUnmount(element);

            if (parentWait) {
              return new Promise<void>((resolve) => {
                (parentWait as Promise<any>).then(() => {
                  const elementWillUnmount = instance.props.elementWillUnmount;
                  if (elementWillUnmount) {
                    // @FIXME the as Promise seems to be wrong, a typeguard is probably needed
                    (elementWillUnmount(element) as Promise<any>).then(() =>
                      resolve()
                    );
                  } else {
                    resolve();
                  }
                });
              });
            }

            const elementWillUnmount = instance.props.elementWillUnmount;

            if (elementWillUnmount) {
              return elementWillUnmount(element);
            }
          };

          return props.children;
        }}
      </Props>
    );
  }
);

export default ElementLifecycle;

export { props };
