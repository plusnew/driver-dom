import plusnew from '@plusnew/core';
import DomInstance from '@plusnew/core/src/instances/types/Dom/Instance';
import RootInstance from '@plusnew/core/src/instances/types/Root/Instance';
import driver from '../../';
import element from './index';

describe('element handling', () => {
  it('moveAfterSibling', () => {
    expect(() => {
      const rootElement = document.createElement('div');

      const renderOptions = {
        portals: {},
        driver: driver(rootElement),
      };
      const rootInstance = new RootInstance(
        true,
        undefined,
        () => null,
        renderOptions,
      );

      const target = new DomInstance(
        <div />,
        rootInstance,
        () => null,
        renderOptions,
      );

      rootElement.removeChild(rootElement.childNodes[0]);

      element.moveAfterSibling(
        target,
        new DomInstance(
          <div />,
          rootInstance,
          () => null,
          renderOptions,
        ),
      );
    }).toThrow(new Error('Could not move orphaned node'));
  });
});
