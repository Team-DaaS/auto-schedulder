import React from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Home = () => {
  // const userId = useSelector((reduxState) => reduxState.userId);
  // console.log(userId);
  return (
    <Box>
      <Box
        name="top section with stadium background"
        // minHeight="600px"
        // mt={2}
        sx={{
          background:
            "url(https://d25qe19fo1nsn4.cloudfront.net/wp-content/uploads/2016/10/US-Soccer-Federation.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Box mt={8} mb={8}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Typography
                  sx={{
                    fontSize: "4rem",
                    fontWeight: "bold",
                    color: "white",
                    lineHeight: "1.2",
                    textShadow: "2px 2px 7px rgba(56, 56, 56, 1)",
                  }}
                >
                  The Most Family Friendly Soccer Schedule Generator
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
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text.
                </Typography>
                <Button variant="contained" size="large">
                  SIGN UP NOW
                </Button>
              </Grid>
              <Grid item xs={4}>
                Dos
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box>Segundo Box</Box>
    </Box>
  );
};

export default Home;
