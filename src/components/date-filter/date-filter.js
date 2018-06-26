import React, {Component} from 'react';

class DateFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minDate: '',
      maxDate: '',
    }
  }

  onMinInputChange(date) {
    this.setState({
      minDate: date
    });

    this.props.onMinDateChange(date);
  }

  onMaxInputChange(date) {
    this.setState({
      maxDate: date
    });

    this.props.onMaxDateChange(date);
  }

  componentDidMount() {

    const dateToday = new Date().toISOString().slice(0, 10);

    this.setState({
      minDate: dateToday,
      maxDate: dateToday,
    });

    this.props.onMinDateChange(this.state.dateToday);
    this.props.onMaxDateChange(this.state.dateToday);
  }

  render() {
    return (
      <div className="date-filter">
        <div className="date-filter__inner">
          <input id="date" type="date" onChange={event => this.onMinInputChange(event.target.value)} value={this.state.minDate} />
          <input id="date" type="date" onChange={event => this.onMaxInputChange(event.target.value)} value={this.state.maxDate} />
        </div>
      </div>
    );
  }
}

export default DateFilter;
