// Calendar component of Google Calendar events
import React from "react";
import { Table } from "reactstrap";
import Event from "./Event";
import "./Calendar.css";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.convertMilitaryToStandard = this.convertMilitaryToStandard.bind(this);
    this.convertGoogleDateTime = this.convertGoogleDateTime.bind(this);
    this.sortEvents = this.sortEvents.bind(this);
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
    let timeInt = parseInt(time.substring(0, 2));
    if (timeInt === 0) {
      time = `12:00 AM`;
    } else if (timeInt === 12) {
      time = `12:00 PM`;
    } else if (timeInt > 12) {
      time = `${timeInt - 12}${time.substring(2)} PM`;
    } else if (timeInt < 10) {
      time = `${time.substring(1)} AM`;
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
        event.description,
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
      "5:00 AM",
      "6:00 AM",
    ];

    let eventsMap = this.sortEvents();

    return (
      <>
        <h1 style={{ padding: "2rem" }}>household calendar</h1>
        <Table id="calendar">
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
            {times.map((time, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{time}</th>
                  {days.map((day, j) => {
                    return eventsMap.hasOwnProperty(
                      `${time},${daysMap[day]}`
                    ) ? (
                      <Event
                        key={j}
                        info={eventsMap[`${time},${daysMap[day]}`]}
                      />
                    ) : (
                      <td key={j}></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Calendar;
