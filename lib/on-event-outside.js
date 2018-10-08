// @flow
import * as React from 'react';

const callbackInstances = {};
const eventListeners = {};

const eventDistributor = (node: Node, eventType: string, e: Event, ...args) => callbackInstances[eventType].forEach((instance) => {
  if (
    node
    && e.target instanceof Node
    && node !== e.target
    && !node.contains(e.target)
  ) {
    instance.onEventOutside(eventType, e, ...args);
  }
});

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
    console.log(this.ref);
  }

  get events(): Array<string> {
    return Object.keys(this.props.on);
  }

  componentDidMount() {
    this.events.forEach((event) => {
      callbackInstances[event] = callbackInstances[event] || [];

      if (!callbackInstances[event].length) {
        eventListeners[event] = eventListeners[event] || ((...args) => eventDistributor(this.ref.current, event, ...args));
        document.addEventListener(event, eventListeners[event]);
      }

      callbackInstances[event].push(this);
    });
  }

  componentWillUnmount() {
    this.events.forEach((event) => {
      callbackInstances[event] = callbackInstances[event].filter(instance => instance !== this);

      if (!callbackInstances[event].length) {
        document.removeEventListener(event, eventListeners[event]);
      }
    });
  }

  onEventOutside(type: string, event: Event, ...args: Array<any>): void {
    this.props.on[type](event, ...args);
  }

  render() {
    return (
      <span ref={this.ref}>
        {this.props.children}
      </span>
    );
  }
}
