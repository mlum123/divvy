// main App component
import React from "react";
import "./App.css";
import "./GoogleCal";
import View from "./components/View";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import GoogleCal from "./GoogleCal";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "home", // default View is home
      isNavbarOpen: false,
      events: [],
      signedIn: false,
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.onNavLinkClick = this.onNavLinkClick.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.onHandleAuthClick = this.onHandleAuthClick.bind(this);
    this.onHandleSignoutClick = this.onHandleSignoutClick.bind(this);
  }

  toggleNavbar() {
    this.setState({ isNavbarOpen: !this.state.isNavbarOpen });
  }

  // event handler for clicking nav link, changes view in state to correct page view
  onNavLinkClick(event) {
    let newViewState = "";
    if (event.target.innerHTML === "household calendar") {
      newViewState = "calendar";
    } else if (event.target.innerHTML === "pie chart") {
      newViewState = "piechart";
    } else {
      newViewState = "home";
    }

    this.setState({ view: newViewState });
  }

  // get events using GoogleCal module's getEvents method
  getEvents() {
    GoogleCal.getEvents().then((events) => {
      this.setState({ events });
      this.setState({ signedIn: GoogleCal.signedIn });
    });
  }

  // Google sign in button click event handler
  onHandleAuthClick() {
    GoogleCal.handleAuthClick();
  }

  // Google sign out button click event handler
  onHandleSignoutClick() {
    GoogleCal.handleSignoutClick();

    // clear events in state and redirect user to home page
    this.setState({ view: "home", events: [] });
  }

  // when App component is mounted,
  // use GoogleCal module to load the auth2 library and API client library
  componentDidMount() {
    GoogleCal.handleClientLoad();
  }

  render() {
    // authButton and signOutButton use GoogleCal module to handle sign in and sign out clicks
    // only display authButton (sign in) if user isn't signed in yet
    // only display signOutButton if user is signed in with Google
    let authButton = (
      <Button
        className="gcal-button"
        id="authorize-button"
        onClick={this.onHandleAuthClick}
      >
        sign in with google
      </Button>
    );
    let signOutButton = (
      <Button
        className="gcal-button"
        id="signout-button"
        onClick={this.onHandleSignoutClick}
      >
        sign out
      </Button>
    );

    return (
      <div className="App">
        <header>
          <Navbar color="light" light expand="md">
            <NavbarBrand onClick={this.onNavLinkClick}>divvy</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={this.state.isNavbarOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink onClick={this.onNavLinkClick}>
                    household calendar
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.onNavLinkClick}>pie chart</NavLink>
                </NavItem>
              </Nav>
              {""}
              {!this.state.signedIn ? authButton : null}
              {this.state.signedIn ? signOutButton : null}
            </Collapse>
          </Navbar>
        </header>
        <View
          view={this.state.view}
          getEvents={this.getEvents}
          events={this.state.events}
        />
      </div>
    );
  }
}

export default App;
