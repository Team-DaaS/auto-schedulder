import React, { Component } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import moment from "moment";
// import { MapStateToProps } from "react-redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import _ from "lodash";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline/lib";

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};

//Example A
const startMatch = moment("2021-10-02 11:30");
const startDate = startMatch.format("YYYY/MM/DD, HH:mm");
const startValueA = moment(startDate);

const endMatch = moment("2021-10-02 12:30");
const endDate = endMatch.format("YYYY/MM/DD, HH:mm");
const endValueA = moment(endDate);

class App extends Component {
  constructor(props) {
    super(props);

    const defaultTimeStart = moment("2021-10-02 08:00")
      .startOf("hour")
      .toDate();
    const defaultTimeEnd = moment("2021-10-02 17:00")
      .startOf("hour")
      // .add(1, "day")
      .toDate();

    this.state = {
      groups: [],
      items: [],
      defaultTimeStart,
      defaultTimeEnd,
      matches: [],
      teamWeight: [],
    };
    // console.log("user id:", props.userId);
  }

  componentDidMount() {
    axios.get("/api/teams").then((response) => {
      this.setState({ matches: response.data.matches });
      this.setState({ teamWeight: response.data.gameWeights });

      let { matches } = response.data;
      let { gameWeights } = response.data;

      // Set the left column group names
      let getGroups = (array) => {
        const groups = [];
        for (let i = 0; i < array.length; i++) {
          const newObj = {
            id: `${i + 1}`,
            title: `${array[i][0][0][0][0].teamBracket}`,
            bgColor: "#fcedbd",
          };
          groups.push(newObj);
        }
        this.setState({ groups: groups });
      };
      getGroups(matches);

      const getGameDays = (arr) => {
        const allMatches = [];
        const days = [];
        let countId = 1;
        for (let i = 0; i < arr.length; i++) {
          days.push([]);
        }
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[i].length; j++) {
            for (let k = 0; k < arr[i][j].length; k++) {
              const newObj = {
                group: arr[i][j][k][0][0].groupId,
                totalWeight: [],
                dayPlay: [j][0],
                id: countId,
                title: `${arr[i][j][k][0][0].teamName} vs ${arr[i][j][k][1][0].teamName}`,
                teamOneId: arr[i][j][k][0][0].teamId,
                teamTwoId: arr[i][j][k][1][0].teamId,
                start: startValueA,
                end: endValueA,
                color: "rgb(158, 14, 206)",
                selectedBgColor: "rgba(225, 166, 244, 1)",
                bgColor: "rgba(225, 166, 244, 0.6)",
              };
              countId++;
              allMatches.push(newObj);
            }
          }
        }

        // step 1 = count all the family ID's (team + counted family ID)
        // step 2 = sum teams and counted family ID to get team weight
        // step 3 = combine team a + team b to get match weight

        const weightTeams = (arr) => {
          const familyWeight = arr.reduce((acc, { familyId }) => {
            if (acc[familyId]) acc[familyId]++;
            else acc[familyId] = 1;
            return acc;
          }, {});

          const teamWeight = arr.reduce((acc, { teamId, familyId }) => {
            const weight = familyWeight[familyId];
            if (acc[teamId]) acc[teamId] += weight;
            else acc[teamId] = weight;
            return acc;
          }, {});
          return teamWeight;
        };
        const objWithTeamWeight = weightTeams(gameWeights);
        // console.log(objWithTeamWeight);

        for (let y = 0; y < allMatches.length; y++) {
          // console.log(objWithTeamWeight[allMatches[y].teamOneId]);
          // console.log(objWithTeamWeight[allMatches[y].teamTwoId]);
          allMatches[y].totalWeight =
            (objWithTeamWeight[allMatches[y].teamOneId] === undefined
              ? 0
              : objWithTeamWeight[allMatches[y].teamOneId]) +
            (objWithTeamWeight[allMatches[y].teamTwoId] === undefined
              ? 0
              : objWithTeamWeight[allMatches[y].teamTwoId]);
        }
        //
        // Note, hard set day values 8 and 7 need to be refactored
        const matchDaysByGroup = [];
        for (let x = 0; x <= 7; x++) {
          let match = allMatches.filter(
            (allM) => allM.dayPlay === x && allM != null
          );
          for (let z = 1; z <= 8; z++) {
            let daysByGroup = match.filter(
              (dBg) => dBg.group === z && dBg != null
            );
            matchDaysByGroup.push(daysByGroup);
          }
        }
        const dailyBrackets = [];
        let i,j,dayBrackets,chunk = 8;
        for (i = 0, j = matchDaysByGroup.length; i < j; i += chunk) {
          dayBrackets = matchDaysByGroup.slice(i, i + chunk);
          dailyBrackets.push(dayBrackets);
        }
        
        //////////SORT BY MATCHES TOTAL WEIGHT
        const sortWeightBracket = (arr) => {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              arr[i][j].sort((a, b) => {
                return a.totalWeight > b.totalWeight ? -1 : 1;
              });
            }
          }
        };

        sortWeightBracket(dailyBrackets);

        // ///////SUM ALL MATCHES WEIGHT TO GET BRACKET WEIGHT

        const getBracketPerDayWeight = (arr) => {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              let dayBracketWeight = 0;
              for (let k = 0; k < arr[i][j].length; k++) {
                dayBracketWeight = dayBracketWeight + arr[i][j][k].totalWeight;
              }
              arr[i][j].push({
                bracketWeight: dayBracketWeight,
                group: arr[i][j][0].group,
              });
            }
          }
        };

        getBracketPerDayWeight(dailyBrackets);

        const dayWeightSameBracket = (arr) => {
          for (let i = 0; i < arr.length; i++) {
            arr[i].sort((a, b) => {
              return a[a.length - 1].bracketWeight >
                b[b.length - 1].bracketWeight
                ? -1
                : 1;
            });
          }
        };

        dayWeightSameBracket(dailyBrackets);        

        for (let p = 0; p < dailyBrackets.length; p++) {
          let backCount = 0
          for (let a = 0; a < dailyBrackets[p].length; a++) {
            dailyBrackets[p][a].pop()
            if (dailyBrackets[p][a].length > 2) {
              let shiftOne = dailyBrackets[p][a].shift()
              dailyBrackets[p][a].splice(-5, 0, "shiftOne");
              backCount--
            }
          }
        }
        console.log(dailyBrackets);

      };
      getGameDays(matches);
      // this.setState({ items: itemsSched });
    });
  }

  render() {
    // if (this.props.userId === 0 || !this.props.userId) {
    //     return <Redirect to="/login" />;
    // }
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;
    // console.log('items', items)
    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        sidebarContent={<div>null</div>}
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        showCursorLine
        canMove={false}
        canResize={true}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      // visibleTimeStart={defaultTimeStart}
      // visibleTimeEnd={defaultTimeEnd}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <div className="auto-scheduler-header" {...getRootProps()}>
                  Location - Brackets
                </div>
              );
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(App);
