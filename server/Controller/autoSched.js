module.exports = {
    getTeams: async (req, res) => {
        const db = req.app.get("db");
        const teams = await db.Sched.get_team();

        let brack8B = []
        let brack8G = []
        let brack9B = []
        let brack9G = []
        let brack10B = []
        let brack10G = []
        let brack11B = []
        let brack11G = []

        for (const key in teams) {
            var brakCheck = teams[key].bracket.substring(teams[key].bracket.indexOf('-'))
            if (brakCheck === '-8B') {
                brack8B.push([teams[key].team_id, teams[key].team_name, teams[key].bracket])
            }
            if (brakCheck === '-8G') {
                brack8G.push([teams[key].team_id, teams[key].team_name, teams[key].bracket])
            }
            if (brakCheck === '-9B') {
                brack9B.push([teams[key].team_id, teams[key].team_name, teams[key].bracket])
            }
            if (brakCheck === '-9G') {
                brack9G.push([teams[key].team_id, teams[key].team_name, teams[key].bracket])
            }
            if (brakCheck === '-10B') {
                brack10B.push([teams[key].team_id, teams[key].team_name, teams[key].bracket])
            }
            if (brakCheck === '-10G') {
                brack10G.push([teams[key].team_id, teams[key].team_name, teams[key].bracket])
            }
            if (brakCheck === '-11B') {
                brack11B.push([teams[key].team_id, teams[key].team_name, teams[key].bracket])
            }
            if (brakCheck === '-11G') {
                brack11G.push([teams[key].team_id, teams[key].team_name, teams[key].bracket])
            }
        }

        let allBracket = [brack8B, brack8G, brack9B, brack9G, brack10B, brack10G, brack11B, brack11G]

        const matchParticipants = (participants) => {
            const p = Array.from(participants);
            if (p % 2 == 1) {
                p.push(undefined);
            }
            const pairings = [];
            while (p.length != 0) {
                participantA = p.shift();
                participantB = p.pop();
                if (participantA != undefined && participantB != undefined) {
                    pairings.push([participantA, participantB]);
                }
            }
            return pairings;
        };

        const rotateArray = (array) => {
            const p = Array.from(array);
            const firstElement = p.shift();
            const lastElement = p.pop();
            return [firstElement, lastElement, ...p];
        };

        const generateTournament = (participants) => {
            const tournamentRounds = [];
            // const rounds = Math.ceil(participants.length / 2);
            const rounds = 8;
            let p = Array.from(participants);
            for (let i = 0; i < rounds; i++) {
                tournamentRounds.push(matchParticipants(p));
                p = rotateArray(p);
            }
            return tournamentRounds;
        };
        //loop to run team bracket over the tournament function
        const matches = []
        for (let i = 0; i < allBracket.length; i++) {
            matches.push(generateTournament(allBracket[i]))
        }

        //loop over the teams, call the DB and send
        let gameWeights = []
        for (const key in matches) {
            const res = matches[key][key]
            // matchSend.push(res)
            let matchFlat = res.flat()
            for (let i = 0; i < matchFlat.length; i++) {
                let dbTeam = matchFlat[i][0]
                const teams = await db.Sched.get_weight({ dbTeam });
                teams.map((el) => {
                    gameWeights.push({
                        teamId: el.team_id,
                        familyId: el.family_id
                    })
                })
            }
        }
        return res.status(201).send({matches, gameWeights});
    },
};
