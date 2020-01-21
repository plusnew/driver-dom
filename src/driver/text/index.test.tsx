import TextInstance from '@plusnew/core/src/instances/types/Text/Instance';
import RootInstance from '@plusnew/core/src/instances/types/Root/Instance';
import driver from '../../';
import element from './index';

describe('text handling', () => {
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

      const target = new TextInstance(
        'foo',
        rootInstance,
        () => null,
        renderOptions,
      );

      rootElement.removeChild(rootElement.childNodes[0]);

      element.moveAfterSibling(
        target,
        new TextInstance(
          'bar',
          rootInstance,
          () => null,
          renderOptions,
        ),
      );
    }).toThrow(new Error('Could not move orphaned node'));
  });
});
