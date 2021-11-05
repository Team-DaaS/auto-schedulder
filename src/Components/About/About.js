import React from "react";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        background:
          "url(https://d25qe19fo1nsn4.cloudfront.net/wp-content/uploads/2016/10/US-Soccer-Federation.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        display: "flex",
        alignItems: "center",
        opacity: 0.85,
      }}
    >
      <Container>
        <Box p={1}>
          <Typography component="h1" variant="h3" mt={4} mb={4}>
            About
          </Typography>
        </Box>
        <Box
          name="top section with stadium background"
          // minHeight="600px"
          // mt={2}
        >
          <Container>
            <Box mt={8} mb={10}>
              <Typography
                sx={{
                  fontSize: "4rem",
                  fontWeight: "bold",
                  color: "white",
                  lineHeight: "1.2",
                  textShadow: "2px 2px 7px rgba(56, 56, 56, 1)",
                }}
              >
                We take your administrators from zero to hero with the click of
                a button!
              </Typography>
              <Typography
                mt={4}
                mb={4}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  lineHeight: "1.2",
                  textShadow: "2px 2px 7px rgba(56, 56, 56, 1)",
                }}
              >
                Ball brace three-five-two yellow card pitch forward upper 90 red
                card hat trick midfielder number 10 center-half soccer referee
                goal four-four-two defender. African Cup of Nations UEFA
                European Championship ball halftime red card goal forward
                striker upper 90 pitch defender three-five-two referee one-two.
                Striker upper 90 one-two chip hat trick forward soccer yellow
                card pitch four-four-two ball goal red card goalie brace
                center-half midfielder. Goalie yellow card center-half UEFA
                European Championship midfielder ball number 10 four-four-two
                brace halftime forward referee one-two upper 90 hat trick red
                card. Messi Heads It Down, Lifts It Over...Oh What A Goal By
                Lionel Messi! World Cup UEFA European Championship ball soccer
                brace one-two goalie red card three-five-two number 10 goal
                four-four-two forward halftime yellow card. UEFA European
                Championship brace African Cup of Nations three-five-two chip
                number 10 goalie halftime pitch forward one-two four-four-two
                World Cup yellow card. African Cup of Nations midfielder ball
                goalie one-two striker four-four-two number 10 pitch center-half
                soccer defender forward yellow card World Cup. UEFA European
                Championship hat trick striker midfielder yellow card number 10
                World Cup upper 90 center-half pitch ball four-four-two chip
                referee goalie. Oh My Goodness Gracious Me! If One Man Could Win
                A Football Match It'd Be Lionel Messi. Pitch UEFA European
                Championship goalie number 10 four-four-two forward hat trick
                upper 90 three-five-two African Cup of Nations referee
                center-half midfielder chip. Yellow card four-four-two halftime
                soccer brace ball defender hat trick chip goal African Cup of
                Nations UEFA European Championship forward. Defender
                four-four-two striker yellow card goalie midfielder hat trick
                pitch halftime UEFA European Championship upper 90 World Cup
                one-two ball African Cup of Nations. Defender forward African
                Cup of Nations halftime number 10 one-two red card yellow card
                chip World Cup goalie four-four-two ball goal.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
