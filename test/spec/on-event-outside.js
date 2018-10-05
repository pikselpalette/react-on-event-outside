/* globals jest */
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OnEventOutside from '../../lib/on-event-outside.js';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

describe('OnEventOutside', () => {
  let Component;

  class TestWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { render: true };
      this.ref = React.createRef();
    }

    static handleClick() {
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
});
