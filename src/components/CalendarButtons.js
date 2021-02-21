// CalendarButtons component displays sign in and sign out buttons for Google Calendar OAuth2
// and is integrated with GoogleCal module so we can get user info from Google Calendar API
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

  // when CalendarButtons component is mounted,
  // use GoogleCal module to load the auth2 library and API client library
  componentDidMount() {
    GoogleCal.handleClientLoad();
  }

  render() {
    // authButton and signOutButton use GoogleCal module to handle sign in and sign out clicks
    let authButton = (
      <Button
        className="gcal-button"
        id="authorize-button"
        onClick={GoogleCal.handleAuthClick}
      >
        sign in with google
      </Button>
    );
    let signOutButton = (
      <Button
        className="gcal-button"
        id="signout-button"
        onClick={GoogleCal.handleSignoutClick}
      >
        sign out
      </Button>
    );
    return (
      <div>
        {this.state.showAuthButton ? authButton : null}
        {this.state.showSignOutButton ? signOutButton : null}
      </div>
    );
  }
}

export default CalendarButtons;
