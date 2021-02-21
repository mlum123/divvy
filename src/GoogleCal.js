// GoogleCal module for OAuth2 to view and edit user's Google Calendar events
const API_KEY = "AIzaSyCFZLWDn5ikn6x-iavj_3paf-Yls8uz8y8";
const CLIENT_ID =
  "1007300008344-5psduufkdoa692i4fri17jh0tc3nob6k.apps.googleusercontent.com";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar";

let gapi = window.gapi;

const GoogleCal = {
  signedIn: false,

  // Sign in the user upon button click.
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  },

  // Sign out the user upon button click.
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  },

  // On load, called to load the auth2 library and API client library.
  handleClientLoad() {
    gapi.load("client:auth2", this.initClient);
  },

  initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(function () {
        // Listen for sign-in state changes.

        gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(GoogleCal.updateSigninStatus);

        // Handle the initial sign-in state.
        GoogleCal.updateSigninStatus(
          gapi.auth2.getAuthInstance().isSignedIn.get()
        );
      });
  },

  // Called when the signed in status changes, to update the UI appropriately.
  // After a sign-in, the API is called.
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      GoogleCal.signedIn = true;
      GoogleCal.getEvents();
    } else {
      GoogleCal.signedIn = false;
    }
  },

  // takes in a date and returns the date for the Monday of that week (start of that week)
  getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  },

  // takes in a date and returns the date for the Sunday of that week (end of that week)
  getSunday(d) {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() + (7 - day);
    return new Date(d.setDate(diff));
  },

  // converts dates to mm/dd/yyyy format
  convertDate(date) {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();
    let converted = mm + "/" + dd + "/" + yyyy;
    return converted;
  },

  // converts Google Cal date-times (in yyyy-mm-ddTtime) to mm/dd/yyyy format
  convertGoogleDateTime(date) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(5, 7);
    let dd = date.substring(8, 10);
    let converted = mm + "/" + dd + "/" + yyyy;
    return converted;
  },

  // Get this week's events on user's household calendar
  getEvents() {
    // TODO - check if user has a household calendar
    // if yes, use that
    // if not, create new household calendar user can use to schedule chores
    // https://www.googleapis.com/calendar/v3/users/me/calendarList
    // today's date
    let today = new Date();

    // calculate monday's date using today's date and today's day of the week
    let monDate = GoogleCal.getMonday(today);
    monDate = GoogleCal.convertDate(monDate);

    // calculate sunday's date using today's date and today's day of the week
    let sunDate = GoogleCal.getSunday(today);
    sunDate = GoogleCal.convertDate(sunDate);

    // use timeMin to specify only getting events that happened / are happening on Monday forward
    return gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date(monDate).toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((res) => {
        // let's say week starts on monday, ends on sunday
        // use filter to get all Google Calendar events for the week
        const events = res.result.items;

        if (events.length > 0) {
          return events.filter((event, i) => {
            let eventTime = event.start.dateTime;
            eventTime = this.convertGoogleDateTime(eventTime);
            let startWeek = Date.parse(monDate);
            let endWeek = Date.parse(sunDate);
            let dateToCheck = Date.parse(eventTime);

            return dateToCheck <= endWeek && dateToCheck >= startWeek;
          });
        } else {
          console.log("No upcoming events found.");
          return [];
        }
      });
  },

  // convert standard time to military time
  convertToMilitary(time) {
    let timeArr = time.split(":");
    let hour = timeArr[0];
    let hourInt = parseInt(hour);

    let min = timeArr[1].substring(0, 2);

    // convert standard time to military time
    if (time.includes("PM") && hourInt !== 12) {
      hour = `${parseInt(hour) + 12}`;
    } else if (time.includes("AM") && hourInt === 12) {
      hour = "0";
    } else if (hourInt < 10) {
      hour = "0" + hour;
    }

    let newTime = hour + ":" + min;

    return newTime;
  },

  // use date string and time string to convert a date and time
  // to 2021-02-19T07:00:00-08:00 format, for updating Google Calendar event
  convertToGoogleTime(date, time) {
    // get date from orig datetime string, concatenate with new military time hour, and new min
    let newTime = date + GoogleCal.convertToMilitary(time) + ":00";

    return newTime;
  },

  // update existing event
  updateEvent(eventId, start, end, summary, description, origDateTime) {
    let startTime = this.convertToGoogleTime(
      origDateTime.substring(0, 11),
      start
    );
    let endTime = this.convertToGoogleTime(origDateTime.substring(0, 11), end);

    gapi.client.calendar.events
      .update({
        calendarId: "primary",
        eventId: eventId,
        start: { dateTime: new Date(startTime).toISOString() },
        end: { dateTime: new Date(endTime).toISOString() },
        summary: summary,
        description: description,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },

  // add new event
  addEvent(start, end, summary, description, date) {
    let startTime = this.convertToGoogleTime(date + "T", start);
    let endTime = this.convertToGoogleTime(date + "T", end);

    gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        start: { dateTime: new Date(startTime).toISOString() },
        end: { dateTime: new Date(endTime).toISOString() },
        summary: summary,
        description: description,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },
};

export default GoogleCal;
