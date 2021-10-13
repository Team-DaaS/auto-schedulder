select * from teams
join players on teams.team_id = 
players.player_id
join family on players.player_id = family.family_id
where family_weight > 0;