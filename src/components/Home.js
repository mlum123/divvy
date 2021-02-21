import React from "react";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div id="hook">
          <h2>
            <em>
              working women spend <strong>15 more hours </strong>a week
            </em>
          </h2>
          <h2>
            <em>on unpaid domestic work than men</em>
          </h2>
          <br></br>
          <h5>
            <em>covid-19 has only exacerbated the situation*</em>
          </h5>
        </div>

        <div id="big-title">
          <div className="highlight">
            <h1>meet divvy</h1>
          </div>
          <br></br>
          <h2>
            <em>a better way to divvy up chores</em>
          </h2>
        </div>

        <div id="resources">
          <div id="atlantic">
            <p>
              "Across the world, women’s independence will be a silent victim of
              the pandemic."
            </p>
            <a
              href="https://www.theatlantic.com/international/archive/2020/03/feminism-womens-rights-coronavirus-covid19/608302/"
              target="_blank"
            >
              <em>
                from The Atlantic — The Coronavirus Is a Disaster for Feminism
              </em>
            </a>
          </div>

          <br></br>

          <div id="bbc">
            <p></p>
            <a href="https://www.bbc.com/worklife/article/20200630-how-covid-19-is-changing-womens-lives">
              <em>*according to the BBC</em>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
