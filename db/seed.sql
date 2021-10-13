drop table if exists league;

create table league (
    id serial primary key,
    password varchar(200) not null,
    email varchar(100) not null,
    league_name varchar(100) not null
);

drop table if exists matches;

create table matches (
    matches_id serial primary key,
    team_name_1 integer references teams(team_id),
    team_name_2 integer references teams(team_id),
    date text, 
    time text,
    location varchar(100) not null 
);

drop table if exists teams;
 
create table teams (
    team_id serial primary key,
    team_name varchar(100) not null
);

drop table if exists family;

create table family (
    family_id serial primary key,
    address text,
    family_weight integer,
    player_id integer references players(player_id)
);

drop table if exists players;

create table players (
    player_id serial primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    family_id integer references family(family_id)
    team_id integer references teams(team_id),
    birth_year integer,
    gender varchar(25) not null,
    email text
);



