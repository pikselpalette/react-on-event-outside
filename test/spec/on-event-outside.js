/* globals jest */
import React from 'react';
import { render } from 'react-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OnEventOutside from '../../lib/on-event-outside.js';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

describe('OnEventOutside', () => {
  let testWrapper;
  let Component;

  class TestWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { render: true };
      this.ref = React.createRef();
      testWrapper = this;
    }

    handleClick() {
      console.log('clicked');
    }

    render() {
      if (!this.state.render) return null;

      return (
        <div ref={this.ref}>
          <OnEventOutside interactableComponentRef={this.ref} on={{
            click: this.handleClick
          }}>
            { this.props.children }
          </OnEventOutside>
        </div>
      );
    }
  }

  beforeEach(() => {
    Component = mount(
      <TestWrapper>
        <p>Click me and I live. Click elsewhere and I die</p>
      </TestWrapper>
    );
  });

  fit('renders without crashing', () => {
    expect(Component).toBeDefined();
  });

  fit('renders children', () => {
    expect(Component.find('p')).toExist();
  });

  fit('calls addEventListener once', () => {
    expect(addEventListener).toHaveBeenCalledTimes(1);
  });

  it('does not call removeEventListener', () => {
    expect(removeEventListener).not.toHaveBeenCalled();
  });

  it('calls it on click callback when body clicked', () => {
    console.log(testWrapper);
  });

  it('does not call on click callback if target not instance of Node', () => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, true);
    Object.defineProperty(event, 'target', { writable: false, value: {} });
    document.body.dispatchEvent(event);

    expect(onClick).not.toHaveBeenCalled();
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
