select * from teams
LEFT JOIN players ON players.team_id = teams.team_id
where teams.team_id = (${dbTeam}) and
players.family_id is not null;