import React, { Component } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Container, Button } from "@mui/material";
import moment from "moment";
// import { MapStateToProps } from "react-redux";
import { showLoader, hideLoader } from '../../Redux/reducer';
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline/lib";
import { add, isFunction } from "lodash";

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

class App extends Component {
  constructor(props) {
    super(props);
    /////// This time setup is to default the calendar view, cannot be removed, should be pulled in by the DB in the future
    const defaultTimeStart = moment("2021-08-28 08:00").startOf("hour").toDate();
    const defaultTimeEnd = moment("2021-08-28 17:00").startOf("hour").toDate();

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

  moreHandle = (dayStart, dayEnd) => {
    const dayStartForward = moment(dayStart).add(+ 7, "days")
    const dayEndForward = moment(dayEnd).add(+ 7, "days")
    console.log(dayStartForward, dayEndForward)
    this.setState({ defaultTimeStart: dayStartForward })
    this.setState({ defaultTimeEnd: dayEndForward })
    this.updateGroups(this.state.groups)
  }

  lessHandle = (dayStart, dayEnd) => {
    const dayStartForward = moment(dayStart).add(- 7, "days")
    const dayEndForward = moment(dayEnd).add(- 7, "days")
    console.log(dayStartForward, dayEndForward)
    this.setState({ defaultTimeStart: dayStartForward })
    this.setState({ defaultTimeEnd: dayEndForward })
    this.updateGroups(this.state.groups)
  }


  updateGroups = (groups) => {
    this.setState({ groups })
  }

  componentDidMount() {
    this.props.showLoader()
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

      /////// START THE SCHDULE FUNCTION
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
                color: "rgb(158, 14, 206)",
                selectedBgColor: "rgba(225, 166, 244, 1)",
                bgColor: "rgba(225, 166, 244, 0.6)",
              };
              countId++;
              allMatches.push(newObj);
            }
          }
        }

        /// REDUCE INDIVIDUAL FAMILY WEIGHT VALUES TO A TEAM WEIGHT
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

        ////// COMBINE TEAM WEIGHTS TO BE A MATCH WEIGHT
        for (let y = 0; y < allMatches.length; y++) {
          allMatches[y].totalWeight =
            (objWithTeamWeight[allMatches[y].teamOneId] === undefined
              ? 0
              : objWithTeamWeight[allMatches[y].teamOneId]) +
            (objWithTeamWeight[allMatches[y].teamTwoId] === undefined
              ? 0
              : objWithTeamWeight[allMatches[y].teamTwoId]);
        }

        ////// ORGANIZE THE MATCHES BY DAYS AND GROUPS
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

        ////// CHUNK THE ARRAY INTO DAYS PLAYED, this step might not be needed
        const dailyBrackets = [];
        let i,
          j,
          dayBrackets,
          chunk = 8;
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

        ///////SUM ALL MATCHES WEIGHT TO GET BRACKET WEIGHT
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

        /////////////// SET BRACKETS BY DAY DESCENDING
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

        /////// ADD TIME SLOTS
        let bracketTimeSlot = [];
        for (let p = 0; p < dailyBrackets.length; p++) {
          for (let a = 0; a < dailyBrackets[p].length; a++) {
            dailyBrackets[p][a].pop();
            for (let b = 0; b <= 5; b++) {
              bracketTimeSlot.push(
                dailyBrackets[p][a][b] === undefined
                  ? b
                  : dailyBrackets[p][a][b]
              );
            }
          }
        }

        ///// SET TIME SLOT HOURS
        const dailyBracketsTimeSlots = [];
        let y,
          q,
          dayBracketsTime,
          chunkTime = 6;
        for (y = 0, q = bracketTimeSlot.length; y < q; y += chunkTime) {
          dayBracketsTime = bracketTimeSlot.slice(y, y + chunkTime);
          dailyBracketsTimeSlots.push(dayBracketsTime);
        }

        //////// LEFT SHIFT THE HEAVY GAMES IN HOUR SLOTS
        let timeSlotsCount = 5;
        for (let p = 0; p < dailyBracketsTimeSlots.length; p++) {
          if (timeSlotsCount < 0) {
            timeSlotsCount = 5;
          }
          let shiftOne = dailyBracketsTimeSlots[p].shift();
          dailyBracketsTimeSlots[p].splice(timeSlotsCount, 0, shiftOne);
          timeSlotsCount--;
        }

        /////// SET THE TIME SLOT - TODO
        for (let p = 0; p < dailyBracketsTimeSlots.length; p++) {
          let dayCount = 0;
          for (let a = 0; a < dailyBracketsTimeSlots[p].length; a++) {
            if (typeof dailyBracketsTimeSlots[p][a] != "number") {
              if (dayCount > 6) dayCount = 0;
              if (dayCount === 0) dailyBracketsTimeSlots[p][a].timeSlot = 9;
              if (dayCount === 1) dailyBracketsTimeSlots[p][a].timeSlot = 10;
              if (dayCount === 2) dailyBracketsTimeSlots[p][a].timeSlot = 11;
              if (dayCount === 3) dailyBracketsTimeSlots[p][a].timeSlot = 12;
              if (dayCount === 4) dailyBracketsTimeSlots[p][a].timeSlot = 13;
              if (dayCount === 5) dailyBracketsTimeSlots[p][a].timeSlot = 14;
            }
            dayCount++;
          }
        }

        let scheduleResult = [];
        let seasonStartDay = moment("2021-08-28 00:00");
        let masterObject = dailyBracketsTimeSlots.flat();

        masterObject.forEach((el, index) => {
          scheduleResult.push({
            id: index,
            group: el.group,
            title: `${el.title}`,
            dayPlay: el.dayPlay,
            timeSlot: el.timeSlot,
            start: moment(
              moment(
                moment(seasonStartDay).add(
                  el.dayPlay === 0
                    ? 0
                    : el.dayPlay === 1
                      ? 7
                      : el.dayPlay === 2
                        ? 14
                        : el.dayPlay === 3
                          ? 21
                          : el.dayPlay === 4
                            ? 28
                            : el.dayPlay === 5
                              ? 35
                              : el.dayPlay === 6
                                ? 42
                                : el.dayPlay === 7
                                  ? 49
                                  : el.dayPlay === 8
                                    ? 56
                                    : null,
                  "days"
                )
              )
                .add(el.timeSlot, "hours")
                .format("YYYY/MM/DD, HH:mm")
            ),
            end: moment(
              moment(
                moment(seasonStartDay).add(
                  el.dayPlay === 0
                    ? 0
                    : el.dayPlay === 1
                      ? 7
                      : el.dayPlay === 2
                        ? 14
                        : el.dayPlay === 3
                          ? 21
                          : el.dayPlay === 4
                            ? 28
                            : el.dayPlay === 5
                              ? 35
                              : el.dayPlay === 6
                                ? 42
                                : el.dayPlay === 7
                                  ? 49
                                  : el.dayPlay === 8
                                    ? 56
                                    : null,
                  "days"
                )
              ).add(el.timeSlot + 1, "hours")
            ),
            tip: "additional information",
            color: "rgb(158, 14, 206)",
            selectedBgColor: "rgba(225, 166, 244, 1)",
            bgColor: "rgba(225, 166, 244, 0.6)",
            itemProps: {
              "data-tip": "anything",
            },
          });
        });
        this.setState({ items: scheduleResult });
        this.props.hideLoader()
      };
      getGameDays(matches);
    });
  }

  render() {
    if (this.props.userId === 0 || !this.props.userId) {
        return <Redirect to="/login" />;
    }
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <div>
        {groups.length != 0 ? (
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
            // defaultTimeStart={defaultTimeStart}
            // defaultTimeEnd={defaultTimeEnd}
            visibleTimeStart={defaultTimeStart}
            visibleTimeEnd={defaultTimeEnd}
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
        ) : (<div></div>)}
        
        <Box m={3} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => this.lessHandle(defaultTimeStart, defaultTimeEnd)} variant="contained">&#60; Previous Week</Button>
          <Button onClick={() => this.moreHandle(defaultTimeStart, defaultTimeEnd)} variant="contained">Next Week &#x3e;</Button>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps, {showLoader, hideLoader} )(App);