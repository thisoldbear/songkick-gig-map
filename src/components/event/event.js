import React, { Component } from 'react';

class Event extends Component {
  render() {
    return (
      <div className="event">
        <h2>{ this.props.details.displayName }</h2>
        <p>{ this.props.details.location.city }</p>
        <p>{ this.props.details.start.date }</p>
        <a href={ this.props.details.uri }>View details on Songkick</a>
      </div>
    )
  }
}

export default Event;
