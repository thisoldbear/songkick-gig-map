import { Component } from 'react';

class Marker extends Component {
  renderMarker() {
    const {
      map, google, position, title
    } = this.props;

    const latLng = new google.maps.LatLng(position.lat, position.lng)

    const config = {
      map: map,
      position: latLng,
      title: title,
    };

    this.marker = new google.maps.Marker(config);

    this.marker.addListener('click', (e) => {
      this.props.eventSelected(this.props.id);
    });
  }

  render() {
    return null;
  }

  componentDidMount() {
    this.renderMarker();
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }
}

export default Marker;
