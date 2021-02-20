import React from "react";

const API_KEY = "AIzaSyAOI8-JscEE9-I5ASQl2IW5rgjzGZAzXm8";
const CLIENT_ID =
  "741533676224-8io2t0a1pmm4dhrs68k38bkvp153nuie.apps.googleusercontent.com";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let gapi = window.gapi;

class GoogleCal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAuthButton: true,
      showSignOutButton: true,
    };

    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.listEvents = this.listEvents.bind(this);
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  handleClientLoad() {
    gapi.load("client:auth2", this.initClient);
  }

  initClient = () => {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(function () {
        // Listen for sign-in state changes.

        // to access instance method you have to use `this.updateSigninStatus`
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
  };

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.setState({
        showAuthButton: false,
        showSignOutButton: true,
      });

      this.listEvents();
      // this.insertNewEvent();
    } else {
      this.setState({
        showAuthButton: true,
        showSignOutButton: false,
      });
    }
  }

  /**
   * Lists the next 10 events on the user's primary calendar.
   */
  listEvents() {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((res) => {
        const events = res.result.items;
        if (events.length > 0) {
          console.log("Upcoming events:");
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log("No upcoming events found.");
        }
      });
  }

  componentDidMount() {
    this.handleClientLoad();
  }

  render() {
    let authButton = (
      <button id="authorize-button" onClick={this.handleAuthClick}>
        Authorize
      </button>
    );
    let signOutButton = (
      <button id="signout-button" onClick={this.handleSignoutClick}>
        Sign Out
      </button>
    );
    return (
      <div className="container">
        {this.state.showAuthButton ? authButton : null}
        {this.state.showSignOutButton ? signOutButton : null}
      </div>
    );
  }
}

export default GoogleCal;
