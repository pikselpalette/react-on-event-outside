import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";
import OnEventOutside from "../../lib/on-event-outside.js";

configure({ adapter: new Adapter() });

describe("OnEventOutside", () => {
  let Component;

  class TestWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { render: true };
      this.ref = React.createRef();
    }

    static handleClick() {}

    render() {
      if (!this.state.render) return null;

      return (
        <OnEventOutside
          on={{
            click: this.handleClick
          }}
        >
          {this.props.children}
        </OnEventOutside>
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

  it("renders without crashing", () => {
    expect(Component).toBeDefined();
  });

  it("renders children", () => {
    expect(Component.find("p")).toExist();
  });
});
