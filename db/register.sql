insert into league 
(email, hash, league_name )

values 
(
    ${email}
    ${hash}
    ${league_name}
    );

    returning *