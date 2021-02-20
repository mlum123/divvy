import React from "react";
import { Table } from "reactstrap";
import "./Calendar.css";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.convertMilitaryToStandard = this.convertMilitaryToStandard.bind(this);
    this.sortEvents = this.sortEvents.bind(this);
    this.convertGoogleDateTime = this.convertGoogleDateTime.bind(this);
  }

  // when Calendar component mounts and updates, get Google Calendar events and put in App state as events
  // which is passed down to us here in Calendar component through props
  componentDidMount() {
    this.props.getEvents();
  }

  componentDidUpdate() {
    this.props.getEvents();
  }

  // convert military time to standard time
  convertMilitaryToStandard(time) {
    if (parseInt(time.substring(0, 2)) > 12) {
      time = `${parseInt(time.substring(0, 2)) - 12}${time.substring(2)} PM`;
    } else {
      time = `${time} AM`;
    }
    return time;
  }

  // converts Google Cal date-times (in yyyy-mm-ddTtime) to mm/dd/yyyy format
  convertGoogleDateTime(date) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(5, 7);
    let dd = date.substring(8, 10);
    let converted = mm + "/" + dd + "/" + yyyy;
    return converted;
  }

  // store Google Calendar events in JSON object with key of time,day,length
  sortEvents() {
    const eventsMap = {};

    this.props.events.forEach((event) => {
      let startTime = event.start.dateTime.substring(11, 16);
      let endTime = event.end.dateTime.substring(11, 16);

      startTime = this.convertMilitaryToStandard(startTime);
      endTime = this.convertMilitaryToStandard(endTime);

      let day = event.start.dateTime;
      day = this.convertGoogleDateTime(day);
      day = new Date(day);
      let dayOfWeek = day.getDay();

      eventsMap[`${startTime},${dayOfWeek}`] = [
        startTime,
        endTime,
        event.summary,
      ];
    });

    return eventsMap;
  }

  render() {
    /* map from day of week in words to number */
    /* assume monday is beginning of week */
    let daysMap = {
      Mon: 1,
      Tues: 2,
      Wed: 3,
      Thurs: 4,
      Fri: 5,
      Sat: 6,
      Sun: 0,
    };

    let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

    let times = [
      "5:00 AM",
      "6:00 AM",
      "7:00 AM",
      "8:00 AM",
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
      "7:00 PM",
      "8:00 PM",
      "9:00 PM",
      "10:00 PM",
      "11:00 PM",
      "12:00 AM",
      "1:00 AM",
      "2:00 AM",
      "3:00 AM",
      "4:00 AM",
    ];

    let eventsMap = this.sortEvents();

    return (
      <div>
        <h1>household calendar</h1>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Mon</th>
              <th>Tues</th>
              <th>Wed</th>
              <th>Thurs</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>
            {times.map((time) => {
              return (
                <tr>
                  <th scope="row">{time}</th>
                  {days.map((day) => {
                    return eventsMap.hasOwnProperty(
                      `${time},${daysMap[day]}`
                    ) ? (
                      <td>{eventsMap[`${time},${daysMap[day]}`]}</td>
                    ) : (
                      <td></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Calendar;
