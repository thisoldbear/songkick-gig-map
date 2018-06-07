import React, { Component } from 'react';

import config from '../config.js';

import Map from '../components/map/map';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: {
        mapStart: {
          lat: 51.454514,
          lng: -2.587910,
        },
      },
      events: [],
      loading: false,
    }

    this.makeApiRequests = this.makeApiRequests.bind(this);
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

  render() {
    return (
      <div className={`app ${this.state.loading ? ' loading' : ''}`}>
        <Map
          mapStart={this.state.coords.mapStart}
          makeRequest={this.makeApiRequests}
          events={this.state.events}
        />
      </div>
    );
  }
}

export default App;
