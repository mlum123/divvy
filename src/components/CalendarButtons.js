import React from "react";
import { Button } from "reactstrap";
import GoogleCal from "../GoogleCal";

class CalendarButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAuthButton: true,
      showSignOutButton: false,
    };
  }

  componentDidMount() {
    GoogleCal.handleClientLoad();
  }

  render() {
    let authButton = (
      <Button
        id="authorize-button"
        onClick={GoogleCal.handleAuthClick}
        color="primary"
      >
        Authorize
      </Button>
    );
    let signOutButton = (
      <Button id="signout-button" onClick={GoogleCal.handleSignoutClick}>
        Sign Out
      </Button>
    );
    return (
      <div className="container">
        {this.state.showAuthButton ? authButton : null}
        {this.state.showSignOutButton ? signOutButton : null}
      </div>
    );
  }
}

export default CalendarButtons;
