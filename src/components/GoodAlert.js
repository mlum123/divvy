// GoodAlert component that pops up on Pie Chart page
// if no one is doing more than their fair share of work!
import React from "react";
import { Alert } from "reactstrap";

class GoodAlert extends React.Component {
  render() {
    return (
      <Alert style={{ margin: "0rem 18rem 0.2rem 18rem" }} color="success">
        No one is doing more than their fair share of work this week — great
        job!
      </Alert>
    );
  }
}

export default GoodAlert;
