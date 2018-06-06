/* globals jest */
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

import OnEventOutside from '../../lib/on-event-outside.js';

Enzyme.configure({ adapter: new Adapter() });

describe('OnEventOutside', () => {
  let component;
  let instance;
  let onClick;

  const click = (node) => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    node.dispatchEvent(event);

    return event;
  };

  beforeEach(() => {
    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');

    onClick = jest.fn();

    component = mount((
      <OnEventOutside on={{ click: onClick }}>
        <p>Hello Laura</p>
      </OnEventOutside>
    ));

    instance = component.instance();
  });

  afterEach(() => {
    component.unmount();
    document.addEventListener.mockRestore();
    document.removeEventListener.mockRestore();
  });

  it('renders children', () => {
    expect(component.find('p')).toHaveText('Hello Laura');
  });

  it('calls addEventListener once', () => {
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
  });

  it('does not call removeEventListener', () => {
    expect(document.removeEventListener).not.toHaveBeenCalled();
  });

  it('calls it on click callback when body clicked', () => {
    const event = click(document.body);

    expect(onClick).toHaveBeenCalledWith(event);
  });

  it('does not call on click when element clicked', () => {
    click(ReactDOM.findDOMNode(instance)); // eslint-disable-line react/no-find-dom-node

    expect(onClick).not.toHaveBeenCalled();
  });

  describe('when component unmounts', () => {
    beforeEach(() => {
      component.unmount();
    });

    it('calls removeEventListener', () => {
      expect(document.removeEventListener).toHaveBeenCalledTimes(1);
    });
  });

  describe('with 2 components', () => {
    let secondComponent;
    let secondOnClick;

    beforeEach(() => {
      secondOnClick = jest.fn();

      secondComponent = mount((
        <OnEventOutside on={{ click: secondOnClick }}>
          Hello Joe
        </OnEventOutside>
      ));
    });

    afterEach(() => {
      secondComponent.unmount();
    });

    it('calls addEventListener once', () => {
      expect(document.addEventListener).toHaveBeenCalledTimes(1);
    });

    it('calls both component callbacks when body clicked', () => {
      const event = click(document.body);

      expect(onClick).toHaveBeenCalledWith(event);
      expect(secondOnClick).toHaveBeenCalledWith(event);
    });

    describe('when one component unmounts', () => {
      beforeEach(() => {
        component.unmount();
      });

      it('does not call removeEventListener', () => {
        expect(document.removeEventListener).not.toHaveBeenCalled();
      });

      describe('when second component unmounts', () => {
        beforeEach(() => {
          secondComponent.unmount();
        });

        it('calls removeEventListener', () => {
          expect(document.removeEventListener).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
