// UnfairAlert component that pops up on Pie Chart page
// if anyone is doing more than their fair share of work
import React from "react";
import { Alert } from "reactstrap";

class UnfairAlert extends React.Component {
  render() {
    return (
      <Alert style={{ margin: "0rem 18rem 0.2rem 18rem" }} color="danger">
        {this.props.people.join(" and ")} will be doing more than their fair
        share of work this week! Would you like to redistribute tasks?
      </Alert>
    );
  }
}

export default UnfairAlert;
