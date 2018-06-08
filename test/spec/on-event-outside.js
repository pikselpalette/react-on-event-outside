/* globals jest */
import React from 'react';
import { render } from 'react-dom';

import OnEventOutside from '../../lib/on-event-outside.js';

describe('OnEventOutside', () => {
  let root;
  let onClick;
  let addEventListener;
  let removeEventListener;
  let testWrapper;

  class TestWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { render: true };
      testWrapper = this;
    }

    render() {
      if (!this.state.render) return null;

      return this.props.children;
    }
  }

  const click = (node) => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    node.dispatchEvent(event);

    return event;
  };

  beforeEach((done) => {
    root = document.createElement('div');
    document.body.appendChild(root);

    addEventListener = jest.spyOn(document, 'addEventListener');
    removeEventListener = jest.spyOn(document, 'removeEventListener');

    onClick = jest.fn();

    render(
      (
        <div>
          <TestWrapper>
            <OnEventOutside on={{ click: onClick }}>
              <p>Hello Laura</p>
            </OnEventOutside>
          </TestWrapper>
          <span />
        </div>
      ),
      root,
      done
    );
  });

  afterEach((done) => {
    jest.restoreAllMocks();

    testWrapper.setState({ render: false }, () => {
      root.remove();
      done();
    });
  });

  it('renders children', () => {
    expect(document.querySelector('p').textContent).toEqual('Hello Laura');
  });

  it('calls addEventListener once', () => {
    expect(addEventListener).toHaveBeenCalledTimes(1);
  });

  it('does not call removeEventListener', () => {
    expect(removeEventListener).not.toHaveBeenCalled();
  });

  it('calls it on click callback when body clicked', () => {
    const event = click(document.body);

    expect(onClick).toHaveBeenCalledWith(event);
  });

  it('does not call on click when element clicked', () => {
    click(document.querySelector('p'));

    expect(onClick).not.toHaveBeenCalled();
  });

  describe('when component unmounts', () => {
    beforeEach((done) => {
      testWrapper.setState({ render: false }, done);
    });

    it('calls removeEventListener', () => {
      expect(removeEventListener).toHaveBeenCalledTimes(1);
    });
  });

  describe('with 2 components', () => {
    let secondOnClick;
    let secondTestWrapper;

    class SecondTestWrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = { render: true };
        secondTestWrapper = this;
      }

      render() {
        if (!this.state.render) return null;

        return this.props.children;
      }
    }

    beforeEach(() => {
      secondOnClick = jest.fn();

      render(
        (
          <SecondTestWrapper>
            <OnEventOutside on={{ click: secondOnClick }}>
              Hello Joe
            </OnEventOutside>
          </SecondTestWrapper>
        ),
        root.querySelector('span')
      );
    });

    afterEach((done) => {
      secondTestWrapper.setState({ render: false }, done);
    });

    it('calls addEventListener once', () => {
      expect(addEventListener).toHaveBeenCalledTimes(1);
    });

    it('calls both component callbacks when body clicked', () => {
      const event = click(document.body);

      expect(secondOnClick).toHaveBeenCalledWith(event);
      expect(onClick).toHaveBeenCalledWith(event);
    });

    describe('when one component unmounts', () => {
      beforeEach((done) => {
        testWrapper.setState({ render: false }, done);
      });

      it('does not call removeEventListener', () => {
        expect(document.removeEventListener).not.toHaveBeenCalled();
      });

      describe('when second component unmounts', () => {
        beforeEach((done) => {
          secondTestWrapper.setState({ render: false }, done);
        });

        it('calls removeEventListener', () => {
          expect(removeEventListener).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
