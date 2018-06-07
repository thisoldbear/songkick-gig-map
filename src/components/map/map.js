import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Marker from './../marker/marker';

class Map extends Component {
  init() {
    const {
      lat, lng
    } = this.props.mapStart;

    const node = ReactDOM.findDOMNode(this.refs.map);

    const center = new window.google.maps.LatLng(lat, lng);

    const mapConfig = {
      center: center,
      zoom: 8,
    };

    this.map = new window.google.maps.Map(node, mapConfig);
  }

  bind() {
    this.map.addListener('click', event => {
      let {
        lat, lng
      } = event.latLng;

      this.map.panTo(new window.google.maps.LatLng(lat(), lng()));

      this.props.makeRequest(lat(), lng());
    });
  };

  renderChildren() {
    if (!this.props.events || !this.props.events.length) {
      return;
    }

    return this.props.events.map(event => {
      const {
        displayName, location, id
      } = event;

      return React.cloneElement(<Marker eventSelected={this.props.eventSelected} />, {
        map: this.map,
        google: window.google,
        position: {
          lat: location.lat,
          lng: location.lng
        },
        title: displayName,
        key: id,
        id: id,
      });
    });
  }

  render() {
    return (
      <div className="map" ref="map">
        { this.renderChildren() }
      </div>
    );
  }

  componentDidMount() {
    this.init();
    this.bind();
  }
}

export default Map;
