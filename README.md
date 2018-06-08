# React OnEventOutside

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This package lets you listen to events outside of a component

## Installation

```sh
npm i --save git+ssh://git@gitlab.piksel.com:sam.boylett/react-on-event-outside.git
```

## Usage

```jsx
import OnEventOutside from 'react-on-event-outside';

class MyComponent extends Component {
  onClick(event) {
    console.log('Somewhere else was clicked!', event);
  }

  render() {
    return (
      <OnEventOutside on={{
          click: this.onClick
      }}>
        Don't click me, click somewhere else
      </OnEventOutside>
    );
  }
}
```
