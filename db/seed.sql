<<<<<<< HEAD
-- drop table if exists league;
create table login (
=======
drop table if exists league;

create table league (
>>>>>>> main
    id serial primary key,
    password varchar(200) not null,
    email varchar(100) not null,
    league_name varchar(100) not null
);

<<<<<<< HEAD
-- drop table if exists game_spots;
create table game_spots(
    date text, 
    time text,
    location varchar(100) not null,
    matches_id integer references matches(matches_id)
)

-- drop table if exists matches;
=======
drop table if exists matches;

>>>>>>> main
create table matches (
    matches_id serial primary key,
    team_name_1 integer references teams(team_id),
    team_name_2 integer references teams(team_id),
<<<<<<< HEAD
);

-- drop table if exists bracket; 
create table bracket (
    bracket_id serial primary key,
    age varchar(100) not null,
    gender varchar(100) not null,
);

-- drop table if exists teams; 
create table teams (
    team_id serial primary key,
    team_name varchar(100) not null
    bracket integer references bracket(bracket_id),
);

-- drop table if exists players;
=======
    date text, 
    time text,
    location varchar(100) not null 
);

drop table if exists teams;
 
create table teams (
    team_id serial primary key,
    team_name varchar(100) not null
);

drop table if exists players;

>>>>>>> main
create table players (
    player_id serial primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    family_id integer,
    team_id integer references teams(team_id),
    birth_year integer,
    gender varchar(25) not null,
    email text
<<<<<<< HEAD
);
=======
);

>>>>>>> main
