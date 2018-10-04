import React, { Fragment } from 'react';
import EventOutside from 'react-on-event-outside';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  state = {
    clickCount: 0
  }

  handleClick = () => {
    this.setState(({ clickCount }) => ({ clickCount: clickCount + 1 }));
  }

  render = () => {
    return (
      <Fragment>
        <div ref={this.ref} style={{background: '#00ddff', padding: '10px'}}>
          <EventOutside parentRef={this.ref} on={{
            click: this.handleClick
          }}>
            Click anything other than me to increase the counter below
          </EventOutside>
      </div>

        <p style={{padding: '0 10px'}}>Clicked: {this.state.clickCount}</p>
      </Fragment>
    );
  }
}

export default App;
