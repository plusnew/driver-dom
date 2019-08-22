import plusnew, { Props, store, component } from '@plusnew/core';
import driver from './index';

describe('rendering the elements', () => {
  const local = store(0, (previousState, action: undefined) => previousState + 1);
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = 'lots of stuff';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('check if element is inserted', () => {
    const Component = component(
      'Component',
      (Props: Props<{}>) => <div class="foo" />,
    );

    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes.length).toBe(1);
    const target = container.childNodes[0] as HTMLElement;
    expect(target.nodeName).toBe('DIV');
    expect(target.className).toBe('foo');
  });

  it('check if elements are inserted', () => {
    const Component = component(
      'Component',
      () => (
        <div>
          <div class="foo" />
          <span class="bar" />
        </div>
      ),
    );
    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes[0].childNodes.length).toBe(2);

    const firstTarget = container.childNodes[0].childNodes[0] as HTMLElement;
    expect(firstTarget.nodeName).toBe('DIV');
    expect(firstTarget.className).toBe('foo');

    const secondTarget = container.childNodes[0].childNodes[1] as HTMLElement;
    expect(secondTarget.nodeName).toBe('SPAN');
    expect(secondTarget.className).toBe('bar');
  });

  it('check if nesting works', () => {
    const Component = component(
      'Component',
      () => (
        <div class="foo">
          <span class="bar" />
        </div>
      ),
    );
    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes.length).toBe(1);
    const target = container.childNodes[0] as HTMLElement;
    expect(target.nodeName).toBe('DIV');
    expect(target.className).toBe('foo');
    expect(target.innerHTML).toBe('<span class="bar"></span>');
  });

  it('check if textnode is created on root', () => {
    const Component = component(
      'Component',
      () => 'foo',
    );

    plusnew.render(<Component />, { driver: driver(container) });
    expect(container.childNodes.length).toBe(1);
    expect(container.innerHTML).toBe('foo');
  });

  it('check if textnode is created on root, even with number', () => {
    const Component = component(
      'Component',
      () => 1,
    );

    plusnew.render(<Component />, { driver: driver(container) });
    expect(container.childNodes.length).toBe(1);
    expect(container.innerHTML).toBe('1');
  });

  it('check if textnode is created', () => {
    const Component = component(
      'Component',
      (Props: Props<{}>) => <div class="foo">bar</div>,
    );
    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes.length).toBe(1);
    const target = container.childNodes[0] as HTMLElement;
    expect(target.nodeName).toBe('DIV');
    expect(target.className).toBe('foo');
    expect(target.innerHTML).toBe('bar');
  });

  it('check if null is created on root', () => {
    const Component = component(
      'Component',
      () => null,
    );
    plusnew.render(<Component />, { driver: driver(container) });

    expect(container.childNodes.length).toBe(0);
    local.dispatch(undefined);
  });

  it('check if undefined is created on root', () => {
    const Component = component(
      'Component',
      () => undefined,
    );

    plusnew.render(<Component />, { driver: driver(container) });
    expect(container.childNodes.length).toBe(0);
  });

  it('check if true is created on root', () => {
    const Component = component(
      'Component',
      () => true as any,
    );

    plusnew.render(<Component />, { driver: driver(container) });
    expect(container.childNodes.length).toBe(0);
    local.dispatch(undefined);
  });

  it('check if false is created on root', () => {
    const Component = component(
      'Component',
      () => false as any,
    );

    plusnew.render(<Component />, { driver: driver(container) });
    expect(container.childNodes.length).toBe(0);
    local.dispatch(undefined);
  });

  it('adding element afterwards', () => {
    const local = store(false);

    const MainComponent = component(
      'Component',
      () =>
        <>
          <header />
          <local.Observer>{localState => localState && <content />}</local.Observer>
          <footer />
        </>,
    );

    plusnew.render(<MainComponent />, { driver: driver(container) });

    expect(container.childNodes.length).toBe(2);
    expect((container.childNodes[0] as HTMLElement).tagName).toBe('HEADER');
    expect((container.childNodes[1] as HTMLElement).tagName).toBe('FOOTER');

    local.dispatch(true);

    expect(container.childNodes.length).toBe(3);
    expect((container.childNodes[0] as HTMLElement).tagName).toBe('HEADER');
    expect((container.childNodes[1] as HTMLElement).tagName).toBe('CONTENT');
    expect((container.childNodes[2] as HTMLElement).tagName).toBe('FOOTER');
  });

  it('boolean attribute', () => {
    const local = store(false);

    const MainComponent = component(
      'Component',
      () =>
        <local.Observer>{localState =>
          <button disabled={localState} />
        }</local.Observer>,
    );

    plusnew.render(<MainComponent />, { driver: driver(container) });

    expect(container.childNodes.length).toBe(1);
    expect((container.childNodes[0] as HTMLButtonElement).tagName).toBe('BUTTON');
    expect((container.childNodes[0] as HTMLButtonElement).disabled).toBe(false);

    local.dispatch(true);

    expect((container.childNodes[0] as HTMLButtonElement).disabled).toBe(true);

    local.dispatch(false);

    expect((container.childNodes[0] as HTMLButtonElement).disabled).toBe(false);
  });

  it('deleting attribute', () => {
    const local = store(false);

    const MainComponent = component(
      'Component',
      () =>
        <local.Observer>{localState =>
          localState ? <div class="foo" /> : <div />
        }</local.Observer>,
    );

    plusnew.render(<MainComponent />, { driver: driver(container) });

    expect(container.childNodes.length).toBe(1);
    expect((container.childNodes[0] as HTMLButtonElement).tagName).toBe('DIV');
    expect((container.childNodes[0] as HTMLButtonElement).className).toBe('');

    local.dispatch(true);

    expect((container.childNodes[0] as HTMLButtonElement).className).toBe('foo');

    local.dispatch(false);

    expect((container.childNodes[0] as HTMLButtonElement).className).toBe('');
  });

  it('move elements', () => {
    const local = store(true);

    const NestedComponent = component(
      'NestedComponent',
      (Props: Props<{ key: number }>) =>
        <Props>{props =>
          <div>{props.key}</div>
        }</Props>,
    );

    const MainComponent = component(
      'Component',
      () =>
        <local.Observer>{localState =>
          localState ? [
            <NestedComponent key={1} />,
            <NestedComponent key={2} />,
            <NestedComponent key={3} />,
          ] : [
            <NestedComponent key={3} />,
            <NestedComponent key={2} />,
            <NestedComponent key={1} />,
          ]
        }</local.Observer>,
    );

    plusnew.render(<MainComponent />, { driver: driver(container) });

    const [first, second, third] = container.childNodes;
    expect(container.childNodes.length).toBe(3);
    expect((first as HTMLElement).tagName).toBe('DIV');
    expect((first as HTMLElement).textContent).toBe('1');
    expect((second as HTMLElement).tagName).toBe('DIV');
    expect((second as HTMLElement).textContent).toBe('2');
    expect((third as HTMLElement).tagName).toBe('DIV');
    expect((third as HTMLElement).textContent).toBe('3');

    local.dispatch(false);

    expect(container.childNodes.length).toBe(3);
    expect(container.childNodes[0]).toBe(third);
    expect(container.childNodes[1]).toBe(second);
    expect(container.childNodes[2]).toBe(first);
    expect((first as HTMLElement).textContent).toBe('1');
    expect((second as HTMLElement).textContent).toBe('2');
    expect((third as HTMLElement).textContent).toBe('3');
  });

  it('move text', () => {
    const local = store(true);

    const NestedComponent = component(
      'NestedComponent',
      (Props: Props<{ key: number }>) =>
        <Props>{props =>
          props.key
        }</Props>,
    );

    const MainComponent = component(
      'Component',
      () =>
        <local.Observer>{localState =>
          localState ? [
            <NestedComponent key={1} />,
            <NestedComponent key={2} />,
            <NestedComponent key={3} />,
          ] : [
            <NestedComponent key={3} />,
            <NestedComponent key={2} />,
            <NestedComponent key={1} />,
          ]
        }</local.Observer>,
    );

    plusnew.render(<MainComponent />, { driver: driver(container) });

    const [first, second, third] = container.childNodes;
    expect(container.childNodes.length).toBe(3);
    expect((first as Text).textContent).toBe('1');
    expect((second as Text).textContent).toBe('2');
    expect((third as Text).textContent).toBe('3');

    local.dispatch(false);

    expect(container.childNodes.length).toBe(3);
    expect(container.childNodes[0]).toBe(third);
    expect(container.childNodes[1]).toBe(second);
    expect(container.childNodes[2]).toBe(first);
    expect((first as HTMLElement).textContent).toBe('1');
    expect((second as HTMLElement).textContent).toBe('2');
    expect((third as HTMLElement).textContent).toBe('3');
  });

  it('update text', () => {
    const local = store('foo');

    const MainComponent = component(
      'Component',
      () =>
        <local.Observer>{localState =>
          localState
        }</local.Observer>,
    );

    plusnew.render(<MainComponent />, { driver: driver(container) });

    expect((container.childNodes[0] as Text).textContent).toBe('foo');

    local.dispatch('bar');

    expect((container.childNodes[0] as Text).textContent).toBe('bar');
  });

  it('removing text', () => {
    const local = store(false);

    const MainComponent = component(
      'Component',
      () =>
        <local.Observer>{localState =>
          localState && 'foo'
        }</local.Observer>,
    );

    plusnew.render(<MainComponent />, { driver: driver(container) });

    expect(container.childNodes.length).toBe(0);

    local.dispatch(true);

    expect((container.childNodes[0] as Text).textContent).toBe('foo');

    local.dispatch(false);

    expect(container.childNodes.length).toBe(0);
  });
});
