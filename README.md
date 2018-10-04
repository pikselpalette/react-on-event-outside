# React OnEventOutside

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://badge.fury.io/js/react-on-event-outside.svg)](https://badge.fury.io/js/react-on-event-outside)
[![Build Status](https://travis-ci.org/pikselpalette/react-on-event-outside.svg?branch=master)](https://travis-ci.org/pikselpalette/react-on-event-outside)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a86d2c282e4143899aa83bf696d8c523)](https://www.codacy.com/app/samboylett/react-on-event-outside?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pikselpalette/react-on-event-outside&amp;utm_campaign=Badge_Grade)
[![devDependencies Status](https://david-dm.org/pikselpalette/react-on-event-outside/dev-status.svg)](https://david-dm.org/pikselpalette/react-on-event-outside?type=dev)
[![peerDependencies Status](https://david-dm.org/pikselpalette/react-on-event-outside/peer-status.svg)](https://david-dm.org/pikselpalette/react-on-event-outside?type=peer)
[![codecov](https://codecov.io/gh/pikselpalette/react-on-event-outside/branch/master/graph/badge.svg)](https://codecov.io/gh/pikselpalette/react-on-event-outside)
[![Mutation testing badge](https://badge.stryker-mutator.io/github.com/pikselpalette/react-on-event-outside/master)](https://stryker-mutator.github.io) [![Greenkeeper badge](https://badges.greenkeeper.io/pikselpalette/react-on-event-outside.svg)](https://greenkeeper.io/)

This package lets you listen to events outside of a component

## Installation

```sh
npm i --save react-on-event-outside
```

## Usage

`OnEventOutside` takes an `on` prop which is an object where the keys are the event type (e.g. `click`, `mousedown`, `keyup`, etc.) and the values are your callbacks.

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
