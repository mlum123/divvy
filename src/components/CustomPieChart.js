import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import UnfairAlert from "./UnfairAlert";

class CustomPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.countTasks = this.countTasks.bind(this);
    this.totalTasks = this.totalTasks.bind(this);
    this.checkFairShare = this.checkFairShare.bind(this);
  }

  // when PieChart component mounts and updates, get Google Calendar events and put in App state as events
  // which is passed down to us here in PieChart component through props
  componentDidMount() {
    this.props.getEvents();
  }

  componentDidUpdate() {
    this.props.getEvents();
  }

  // creates mapping from person to number of tasks
  countTasks() {
    let personNumTasksMap = {};
    this.props.events.forEach((event) => {
      // if chore done by multiple people, people are separated by commas
      let responsible = event.description.split(", ");

      // for each person, update their num of tasks in the mapping
      for (let i in responsible) {
        let person = responsible[i];

        if (personNumTasksMap.hasOwnProperty(person)) {
          personNumTasksMap[person] += 1;
        } else {
          personNumTasksMap[person] = 1;
        }
      }
    });

    return personNumTasksMap;
  }

  // calculates total num of tasks
  totalTasks(personNumTasksMap) {
    return Object.values(personNumTasksMap).reduce((a, b) => a + b);
  }

  // organizes each person's num of tasks into correct format to use PieChart
  // according to mapping from person to num tasks passed in
  organizeTaskData(personNumTasksMap) {
    let colors = ["#F78888", "#F3D250", "#90CCF4", "#5DA2D5"];
    let people = [];
    let i = 0;
    for (let person in personNumTasksMap) {
      people.push({
        title: person,
        value: personNumTasksMap[person],
        color: colors[i % 4],
      });
      i += 1;
    }
    return people;
  }

  // checks if anyone is doing more than their fair share
  // if yes, add them to array to return
  checkFairShare(personNumTasksMap) {
    let fairShare =
      this.totalTasks(personNumTasksMap) /
      Object.keys(personNumTasksMap).length;

    let moreThanFair = [];
    for (let person in personNumTasksMap) {
      if (personNumTasksMap[person] > fairShare) {
        moreThanFair.push(person);
      }
    }

    return moreThanFair;
  }

  render() {
    let pieChartData;
    let moreThanFair;
    if (this.props.events.length > 0) {
      let personNumTasksMap = this.countTasks();
      pieChartData = this.organizeTaskData(personNumTasksMap);

      // check if anyone is doing more than their fair share
      // if yes, we'll display an alert and ask if they want to redistribute tasks
      moreThanFair = this.checkFairShare(personNumTasksMap);
    }

    return (
      <div>
        {this.props.events.length > 0 ? (
          <>
            <h1 style={{ padding: "2rem" }}>
              this week's distribution of tasks
            </h1>
            {moreThanFair.length > 0 ? (
              <UnfairAlert people={moreThanFair} />
            ) : (
              ""
            )}
            <PieChart
              animate
              animationDuration={500}
              animationEasing="ease-out"
              center={[50, 18]}
              data={pieChartData}
              lengthAngle={360}
              lineWidth={55}
              paddingAngle={0}
              radius={16}
              startAngle={0}
              viewBoxSize={[100, 100]}
              label={(data) =>
                data.dataEntry.title + ": " + data.dataEntry.value
              }
              labelPosition={73}
              labelStyle={{ fontSize: "0.15rem" }}
            />
          </>
        ) : (
          <h3 style={{ padding: "2rem" }}>no tasks yet — enjoy your week!</h3>
        )}
      </div>
    );
  }
}

export default CustomPieChart;
