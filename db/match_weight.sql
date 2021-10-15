select * from teams
join players on teams.team_id = 
players.player_id

where family_weight > 0;