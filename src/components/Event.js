// Event component to display each individual event in Calendar view
import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import "./Event.css";

class Event extends React.Component {
  // info for event is passed down to Event component by Calendar component
  // info is stored as array of 3 elements: [startTime, endTime, summary, description]
  render() {
    return (
      <Toast className="event">
        <ToastHeader style={{ color: "black" }}>
          {this.props.info[2]}
        </ToastHeader>
        <ToastBody>
          {this.props.info[0]} - {this.props.info[1]}
          <br></br>
          {this.props.info[3]}
        </ToastBody>
      </Toast>
    );
  }
}

export default Event;
