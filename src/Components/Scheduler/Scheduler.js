import React, { Component } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import moment from "moment";
// import { MapStateToProps } from "react-redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";

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

//Example B
const startMatchB = moment("2021-10-02 09:00");
const startDateB = startMatchB.format("YYYY/MM/DD, HH:mm");
const startValueB = moment(startDateB);

const endMatchB = moment("2021-10-02 10:00");
const endDateB = endMatchB.format("YYYY/MM/DD, HH:mm");
const endValueB = moment(endDateB);

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

        //start demo data

        // const groups = [
        //     {
        //         id: "1",
        //         title: "Eastwood Field - 1",
        //         bgColor: "#fcedbd",
        //     },
        //     {
        //         id: "2",
        //         title: "Eastwood Field - 2",
        //         bgColor: "#f5f771",
        //     },
        //     {
        //         id: "3",
        //         title: "Eastwood Field - 3",
        //         bgColor: "#d3f279",
        //     },
        // ];
        // const items = [
        //     {
        //         id: "0",
        //         group: "1",
        //         title: "Team Viper vs Team Raptor Claws - 5% Conflict",
        //         start: startValueA,
        //         end: endValueA,
        //         tip: "additional information",
        //         color: "rgb(158, 14, 206)",
        //         selectedBgColor: "rgba(225, 166, 244, 1)",
        //         bgColor: "rgba(225, 166, 244, 0.6)",
        //     },
        //     {
        //         id: "1",
        //         group: "2",
        //         title: "Team Wildcats vs Team Eagles - 10% Conflict",
        //         start: startValueB,
        //         end: endValueB,
        //         className: "",
        //     },
        //     {
        //         id: "2",
        //         group: "3",
        //         title: "Team Hooligans vs Team Temper Tantrum - 8% Conflict",
        //         start: startValueA,
        //         end: endValueA,
        //         className: "",
        //     },
        //     {
        //         id: "3",
        //         group: "3",
        //         title: "Team Unicorn vs Team Rainbow  - 2% Conflict",
        //         start: startValueB,
        //         end: endValueB,
        //         className: "",
        //     },
        // ];
        //end demo data
        //groups run up to 8
        //title is in the innest arrays and is a property of an object

        this.state = {
            groups: [],
            items: [],
            defaultTimeStart,
            defaultTimeEnd,
            matches: [],
            teamWeight: [],
            matchTime: [],
        };
        // console.log("user id:", props.userId);
    }

    componentDidMount() {
        axios.get("/api/teams").then((response) => {
            this.setState({ teamWeight: response.data.gameWeights });
            this.setState({ matches: response.data.matches });
            // console.log(response.data.gameWeights);
            let { matches: allGames } = response.data
            
            // Set the Groups Object
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
            getGroups(allGames)

            let matchRes = allGames
            const teamsFlat = matchRes.flat()
            const teamsTitle = []
            teamsFlat.forEach((team) => {
                team.forEach((teamEl) => {
                    const teamA = []
                    const teamB = []
                    const groupId = []                    
                    teamEl.forEach((teamNames, i) => {
                        if (i % 2 == 0) {
                            teamA.push(teamNames[0].teamName);
                            groupId.push(teamNames[0].groupId);
                        }
                        else {
                            teamB.push(teamNames[0].teamName)
                        }
                    })
                    teamsTitle.push({
                        matchName: teamA + ' vs ' + teamB,
                        groupId: groupId,
                    })
                })
            })
            const masterObj = allGames
            console.log('Source Response', masterObj)
            console.log('Flat teams array', teamsTitle)
            const itemsSched = []
            for (let i = 0; i < teamsTitle.length; i++) {
                // console.log('huh',teamsTitle[i].groupId[0])
                itemsSched.push(
                    {
                        id: i,
                        group: teamsTitle[i].groupId[0],
                        title: teamsTitle[i].matchName,
                        start: startValueA,
                        end: endValueA,
                        color: "rgb(158, 14, 206)",
                        selectedBgColor: "rgba(225, 166, 244, 1)",
                        bgColor: "rgba(225, 166, 244, 0.6)",
                    },
                )
            }
            this.setState({ items: itemsSched });
            // console.log('IS', itemsSched)

            // teamsTitle.forEach((el, i) => {
            // el.map(() => {
            //     itemsSched.push(
            //         {
            //             id: i,
            //             group: "1",
            //             title: teamsTitle[i],
            //             start: startValueA,
            //             end: endValueA,
            //             color: "rgb(158, 14, 206)",
            //             selectedBgColor: "rgba(225, 166, 244, 1)",
            //             bgColor: "rgba(225, 166, 244, 0.6)",
            //         },
            //     )
            // })
            // })
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
