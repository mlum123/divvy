import logo from "./logo.svg";
import "./App.css";
import "./GoogleCal";
import GoogleCal from "./GoogleCal";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GoogleCal />
      </header>
    </div>
  );
}

export default App;
