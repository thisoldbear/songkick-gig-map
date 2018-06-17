import React, { Component } from 'react';

class Event extends Component {
  render() {
    const { details } = this.props;

    return (
      <div className="event">
        <h2>{ details.displayName }</h2>
        <p>{ details.location.city }</p>
        <p>{ details.start.date }</p>
        <a href={ details.uri }>View details on Songkick</a>
      </div>
    )
  }
}

export default Event;
