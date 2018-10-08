import React, { Fragment, Component } from 'react';
import EventOutside from '@pikselpalette/react-on-event-outside';

class Example extends Component {
  state = {
    item1: false,
    item2: false
  }

  handleClick = (item, clickState) => {
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

        <EventOutside on={{
          click: () => {
            this.handleClick('item1', false);
          }
        }}>
          <div
            style={{
              background: 'red',
              padding: '10px'
            }}
            onClick={() => {
              this.handleClick('item1', true);
            }}
          >
            <p>Click here to activate 1</p>
            <p>1 active: {this.state.item1 ? 'true' : 'false'}</p>
          </div>
        </EventOutside>


        <EventOutside on={{
          click: () => {
            this.handleClick('item2', false);
          }
        }}>
          <div
            style={{
              background: 'green',
              padding: '10px'
            }}
            onClick={() => {
              this.handleClick('item2', true);
            }}
          >
            <p>Click here to activate 2</p>
            <p>2 active: {this.state.item2 ? 'true' : 'false'}</p>
          </div>
        </EventOutside>
      </Fragment>
    );
  }
}

export default Example;
