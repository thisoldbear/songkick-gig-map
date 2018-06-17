import React, { Component } from 'react';

class Overlay extends Component {
  render() {
    return (
      <div className="overlay">
        <div className="overlay__inner">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default Overlay;
