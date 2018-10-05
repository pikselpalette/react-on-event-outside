# React OnEventOutside

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://badge.fury.io/js/react-on-event-outside.svg)](https://badge.fury.io/js/react-on-event-outside)
[![Build Status](https://travis-ci.org/pikselpalette/react-on-event-outside.svg?branch=master)](https://travis-ci.org/pikselpalette/react-on-event-outside)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a86d2c282e4143899aa83bf696d8c523)](https://www.codacy.com/app/samboylett/react-on-event-outside?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pikselpalette/react-on-event-outside&amp;utm_campaign=Badge_Grade)
[![devDependencies Status](https://david-dm.org/pikselpalette/react-on-event-outside/dev-status.svg)](https://david-dm.org/pikselpalette/react-on-event-outside?type=dev)
[![peerDependencies Status](https://david-dm.org/pikselpalette/react-on-event-outside/peer-status.svg)](https://david-dm.org/pikselpalette/react-on-event-outside?type=peer)
[![codecov](https://codecov.io/gh/pikselpalette/react-on-event-outside/branch/master/graph/badge.svg)](https://codecov.io/gh/pikselpalette/react-on-event-outside)
[![Mutation testing badge](https://badge.stryker-mutator.io/github.com/pikselpalette/react-on-event-outside/master)](https://stryker-mutator.github.io)

This package lets you listen to events outside of a component.

An example use case is to allow a component to close when a user clicks elsewhere on the page.

## Installation

```sh
npm i --save react-on-event-outside
```

## Usage

`OnEventOutside` allows react components to interact with other components events.

It takes the following props:
*  interactableComponentRef - A ref to a component that lives outside the react-on-event-outside. This is the component that will provide events to react-on-event-outside.
*  on - An object where the keys are the event type (e.g. `click`, `mousedown`, `keyup`, etc.) and the values are your callbacks.

## Example

TLDR: checkout the working example in the example folder.

We need a component that will provide the events to react-on-event-outside.
Unfortunately this needs to be a class rather than a functional component, as we
can only get refs from classes.

There are two steps in the following example:
*  We need to create a ref in our constructor
*  Attach the ref to the component using the ref attribute

```jsx
import React, { Component } from 'react';

class Example extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  render = () => (
    <div ref={this.ref}>
  );
}

export default Example;
```

Now we have a ref ready to use, we need to add react-on-event-outside, and pass the ref to it.

```jsx
import React, { Component } from 'react';
import EventOutside from 'react-on-event-outside';

class Example extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  render = () => {
    return (
      <div ref={this.ref}>
        <EventOutside interactableComponentRef={this.ref} />
      </div>
    );
  }
}

export default Example;
```

And finally, we need to tell react-on-event-outside which events we should listen to.

```jsx
import React, { Component } from 'react';
import EventOutside from 'react-on-event-outside';

class Example extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  handleClick = () => {
    console.log('clicked!');
  }

  render = () => {
    return (
      <div ref={this.ref}>
        <EventOutside interactableComponentRef={this.ref} on={{
          click: this.handleClick
        }}>
          Click anything other than me to increase the counter below
        </EventOutside>
      </div>
    );
  }
}

export default Example;
```

We should now be able to click inside the component that provided the events, and see a console log appear.

