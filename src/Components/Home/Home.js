import React from "react";
import { Box, flexbox } from "@mui/system";
// import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Card, CardContent, CardMedia, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Steper from "./Steper";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const Home = () => {
  // const userId = useSelector((reduxState) => reduxState.userId);
  // console.log(userId);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

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
      <Box>
        <Container>
          <Box mb={8} mt={8}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://t4.ftcdn.net/jpg/00/84/47/75/360_F_84477571_MurDfSJOuMEW4yeBpZdB676FahMzQH2c.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Built with family in mind
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://www.wbbjtv.com/content/uploads/2018/08/Screen-Shot-2018-08-26-at-4.45.17-PM.png"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Any number of fields
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://www.ziprecruiter.com/blog/static/wp-content/uploads/2019/11/28160715/1148407859_Soccer-Coach.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      For players & coaches
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "#F0F0F0" }} pb={8} pt={8}>
        <Container>
          <Box>
            <Grid container spacing={2}>
              <Grid element xs={7}>
                <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
                  <Paper
                    square
                    elevation={0}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: 50,
                      pl: 2,
                      bgcolor: "background.default",
                    }}
                  >
                    <Typography>{images[activeStep].label}</Typography>
                  </Paper>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {images.map((step, index) => (
                      <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                            component="img"
                            sx={{
                              height: 255,
                              display: "block",
                              maxWidth: 600,
                              overflow: "hidden",
                              width: "100%",
                            }}
                            src={step.imgPath}
                            alt={step.label}
                          />
                        ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </Box>
              </Grid>
              <Grid element xs={5}>
                <Typography variant="h4" mb={2}>
                  Your season in 3 easy steps
                </Typography>
                <Steper />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box pb={8} pt={8}>
        <Container>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h4"
              mb={2}
              sx={{ textAlign: "center", display: "inline-block" }}
            >
              Sign up today and build your soccer season un a few clicks
            </Typography>
            <Button variant="contained" sx={{ margin: "auto" }}>
              Sign up now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
