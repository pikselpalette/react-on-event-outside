import React, { Fragment, Component } from 'react';
import EventOutside from '@pikselpalette/react-on-event-outside';

const Outside = ({ handleClick, itemName, backgroundColour, state }) => (
  <EventOutside on={{
    click: () => {
      handleClick(itemName, false);
    }
  }}>
    <div
      onClick={() => {
        handleClick(itemName, true);
      }}
      style={{
        background: backgroundColour,
        padding: '10px'
      }}
    >
      <p>Click here to activate {itemName}</p>
      <p>{itemName} active: {state ? 'true' : 'false'}</p>
    </div>
  </EventOutside>
);

class Example extends Component {
  state = {
    item1: false,
    item2: false
  }

  handleClick = (item, clickState) => {
    console.log(item, clickState);
    this.setState({ [item]: clickState });
  }

  render = () => {
    return (
      <Fragment>
        <p>
          This example shows that we can have more than one EventOutside components on a page without them clashing with one another.
        </p>
        <p>
          Click anywhere in the coloured boxes to activate that box. click outside the boxes to deactivate them.
          Notice that clicking on one box does not deactivate the other.
        </p>

        <Outside handleClick={this.handleClick} itemName='item1' backgroundColour='#00ddff' state={this.state.item1} />
        <Outside handleClick={this.handleClick} itemName='item2' backgroundColour='#ddff00' state={this.state.item2} />
      </Fragment>
    );
  }
}

export default Example;
