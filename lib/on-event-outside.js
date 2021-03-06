// @flow
import * as React from 'react';

const callbackInstances = {};
const eventListeners = {};

const eventDistributor = (eventType: string, e: Event, ...args) => {
  callbackInstances[eventType].forEach((instance) => {
    if (
      instance.ref &&
      instance.ref.current &&
      e.target instanceof Node &&
      instance.ref.current !== e.target &&
      !instance.ref.current.contains(e.target)
    ) {
      instance.onEventOutside(eventType, e, ...args);
    }
  });
};

type Props = {
  on: {
    [string]: (e: Event) => void
  },
  children: React.Node
};

export default class OnEventOutside extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  get events(): Array<string> {
    return Object.keys(this.props.on);
  }

  componentDidMount() {
    this.events.forEach((event) => {
      callbackInstances[event] = callbackInstances[event] || [];

      if (!callbackInstances[event].length) {
        eventListeners[event] = (...args) => eventDistributor(event, ...args);
        document.addEventListener(event, eventListeners[event]);
      }

      callbackInstances[event].push(this);
    });
  }

  componentWillUnmount() {
    this.events.forEach((event) => {
      callbackInstances[event] = callbackInstances[event].filter(
        (instance) => instance !== this
      );

      if (!callbackInstances[event].length) {
        document.removeEventListener(event, eventListeners[event]);
      }
    });
  }

  onEventOutside(type: string, event: Event, ...args: Array<any>): void {
    this.props.on[type](event, ...args);
  }

  render() {
    return <div ref={this.ref}>{this.props.children}</div>;
  }
}
