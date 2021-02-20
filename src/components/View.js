// View component that manages what view (Home, Calendar, or Pie Chart) to show you
// based on what nav link user clicks
import React from "react";
import Home from "./Home";
import Calendar from "./Calendar";
import PieChart from "./PieChart";

class View extends React.Component {
  render() {
    return (
      <div>
        {this.props.view === "home" ? <Home /> : ""}
        {this.props.view === "calendar" ? (
          <Calendar
            getEvents={this.props.getEvents}
            events={this.props.events}
          />
        ) : (
          ""
        )}
        {this.props.view === "piechart" ? <PieChart /> : ""}
      </div>
    );
  }
}

export default View;
