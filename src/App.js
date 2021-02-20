import logo from "./logo.svg";
import "./App.css";
import "./GoogleCal";
import CalendarButtons from "./components/CalendarButtons";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CalendarButtons />
      </header>
    </div>
  );
}

export default App;
