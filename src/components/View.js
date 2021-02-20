import React from "react";
import Home from "./Home";
import Calendar from "./Calendar";
import PieChart from "./PieChart";

class View extends React.Component {
  render() {
    return (
      <div>
        {this.props.view === "home" ? <Home /> : ""}
        {this.props.view === "calendar" ? <Calendar /> : ""}
        {this.props.view === "piechart" ? <PieChart /> : ""}
      </div>
    );
  }
}

export default View;
