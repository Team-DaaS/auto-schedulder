-- START example iterator logic

bracket example:
0 = >=6 girls =  8 teams
1 = >=6 boys = 8 teams

2 = 7 girls
3 = 7 boys

4 = 8 girls
5 = 8 boys

6 = 9 girls
7 = 9 boys

8 = 10 girls
9 = 10 boys

location example: 
A1 = bracket 0,1 
A2 = bracket 0,1 

B1 = bracket 2,3 
B2 = bracket 2,3

-- START example
bracket example:
0 = >=6 girls =  8 teams
1 = >=6 boys = 8 teams

2 = 7 girls
3 = 7 boys

4 = 8 girls
5 = 8 boys

6 = 9 girls
7 = 9 boys

8 = 10 girls
9 = 10 boys

location example: 
A1 = bracket 0,1 
A2 = bracket 0,1

B1 = bracket 2,3
B2 = bracket 2,3

C1 = bracket 4,5
C2 = bracket 4,5


Fake Family - 5 kids - Family ID(304) (player/kids = bracket [0,3,3,4,9] team IDs [7,4,8,9,1])

Fake Family One -  4 kids - ID(305) (player/kids = bracket [1,3,2,5]  team IDs  [2,3,5,6])

Step one - Largest family First 
Step two - Set the first player of the largest family in game spot with the player ID and the bracket ID (== bracket) (loop the rest of the family )
    a) familiy member 1 ( bracket 0 team 7 location A1 date (10-2-2021) time (9:00am) (team spot 1)) Family ID(304) -- This player is A1 bracket 0 9am
    b) familiy member 2 ( bracket 3 team 4 location B1 date (10-2-2021) time (10:00am) (team spot 1) Family ID(304)
    c) familiy member 3 ( bracket 3 team 8 location B1 date (10-2-2021) time (11:00am) (team spot 1) Family ID(304)
    d) familiy member 4 ( bracket 4 team 9 location C1 date (10-2-2021) time (12:00am) (team spot 1) Family ID(304)
    e) familiy member 5 ( bracket 9 team 1 location C1 date (10-2-2021) time (1:00pm) (team spot 1) Family ID(304)

On the 2nd loop
    f- some future spot) player ( bracket 1 team 2 location  date (10-2-2021) time (9:00am) )
    if( bracket === bracket ) try to set team 
    
    if (time === time ) - is there a time conflict 

    if (team === team) (team spot 1 or 2)
    if (team != team ) (team spot 2)
    
    g- player ( bracket 3 team 3 location A1 date (10-2-2021) time (9:00am) )  - ( team spot 2 )  

    -- if( bracket != bracket ) do something else (Skip to next spot)


Step three - 

B1 = bracket 2,3
B2 = bracket 2,3

C1 = bracket 4,5
C2 = bracket 4,5


Fake Family - 5 kids - Family ID(304) (player/kids = bracket [0,3,3,4,9] team IDs [7,4,8,9,1])

Fake Family One -  4 kids - ID(305) (player/kids = bracket [1,3,2,5]  team IDs  [2,4,5,6])

Step one - Largest family First 
Step two - Set the first player of the largest family in game spot with the player ID and the bracket ID (== bracket) (loop the rest of the family )
    a) familiy member 1 ( bracket 0 team 7 location A1 date (10-2-2021) time (9:00am) (team spot 1)) Family ID(304) -- This player is A1 bracket 0 9am
    b) familiy member 2 ( bracket 3 team 4 location B1 date (10-2-2021) time (10:00am) (team spot 1) Family ID(304)
    c) familiy member 3 ( bracket 3 team 8 location B1 date (10-2-2021) time (11:00am) (team spot 1) Family ID(304)
    d) familiy member 4 ( bracket 4 team 9 location C1 date (10-2-2021) time (12:00am) (team spot 1) Family ID(304)
    e) familiy member 5 ( bracket 9 team 1 location C1 date (10-2-2021) time (1:00pm) (team spot 1) Family ID(304)

On the 2nd loop
    f- some future spot) player ( bracket 1 team 2 location  date (10-2-2021) time (9:00am) )
    if( bracket === bracket ) try to set team
    if (team === team) (team spot 1 or 2)
    if (team != team ) (team spot 2)
    if (time === time ) (can set team spot)
    g- player ( bracket 3 team 3 location A1 date (10-2-2021) time (9:00am) )  - ( team spot 2 )  

    -- if( bracket != bracket ) do something else (Skip to next spot)


Step three - 



-- END example
