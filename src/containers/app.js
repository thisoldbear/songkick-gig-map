import React, { Component } from 'react';

import config from '../config.js';

import Map from '../components/map/map';
import Overlay from '../components/overlay/overlay';
import Event from '../components/event/event';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: {
        lat: null,
        lng: null,
      },
      events: [],
      loading: false,
      selectedEvent: null,
    }

    ///  Bind methods
    this.makeApiRequests = this.makeApiRequests.bind(this);
    this.eventSelected = this.eventSelected.bind(this);
    this.geolocationSuccess = this.geolocationSuccess.bind(this);
    this.geolocationError = this.geolocationError.bind(this);
  }

  makeRequestForMetroAreaId(lat, lng) {
    return fetch(`https://api.songkick.com/api/3.0/search/locations.json?location=geo:${lat},${lng}&apikey=${config.SK_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(response => response.resultsPage.results.location ? response.resultsPage.results.location[0].metroArea.id : false);
  }

  makeRequestForEvents(metroAreaId) {
    return fetch(`http://api.songkick.com/api/3.0/metro_areas/${metroAreaId}/calendar.json?apikey=${config.SK_API_KEY}`)
      .then(response => {
        return response.json()
      })
      .then(events => {
        this.setState({
          events: events.resultsPage.results.event,
          loading: false,
        });
      });
  }

  makeApiRequests(lat, lng) {
    this.toggleLoader(true);
    this.makeRequestForMetroAreaId(lat, lng)
      .then(metroAreaId => this.makeRequestForEvents(metroAreaId));
  }

  toggleLoader(bool) {
    this.setState({
      loading: bool,
    });
  }

  eventSelected(id) {
    const event = this.state.events.filter(event => {
      return event.id === id;
    });

    this.setState({
      selectedEvent: event[0],
    });
  }

  renderMap() {
    return React.cloneElement(<Map
      mapStart={this.state.coords}
      makeRequest={this.makeApiRequests}
      eventSelected={this.eventSelected}
      events={this.state.events}
    />);
  }

  geolocationSuccess(pos) {
    const {latitude, longitude} = pos.coords;

    this.setState({
      coords: {
        lat: latitude,
        lng: longitude,
      }
    });
  }

  geolocationError() {
    console.log('error');
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError);
  }

  render() {
    return (
      <div className={`app ${this.state.loading ? ' loading' : ''}`}>
        { this.state.coords.lat !== null ? this.renderMap() : 'Loading...' };

        <Overlay>
          {this.state.selectedEvent ? (
            <Event details={this.state.selectedEvent} />
          ) : (
            <h1>Songkick Gig Map</h1>
          )}
        </Overlay>
      </div>
    );
  }
}

export default App;
