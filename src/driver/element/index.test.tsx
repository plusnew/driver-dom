import plusnew from '@plusnew/core';
import HostInstance from '@plusnew/core/src/instances/types/Host/Instance';
import RootInstance from '@plusnew/core/src/instances/types/Root/Instance';
import driver from '../../';

describe('element handling', () => {
  it('moveAfterSibling', () => {
    expect(() => {
      const rootElement = document.createElement('div');

      const driverInstance = driver(rootElement);

      const renderOptions = {
        portals: {},
        driver: driverInstance,
      };
      const rootInstance = new RootInstance(
        true,
        undefined,
        () => null,
        renderOptions,
      );

      const target = new HostInstance(
        <div />,
        rootInstance,
        () => null,
        renderOptions,
      );

      rootElement.removeChild(rootElement.childNodes[0]);

      driverInstance.element.moveAfterSibling(
        target,
        new HostInstance(
          <div />,
          rootInstance,
          () => null,
          renderOptions,
        ),
      );
    }).toThrow(new Error('Could not move orphaned node'));
  });
});
