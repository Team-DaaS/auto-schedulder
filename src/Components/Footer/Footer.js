import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ScheduleRounded } from "@material-ui/icons";

export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#1976d2" }}>
      <Container maxWidth="lg">
        <Box p={{ xs: 4, md: 6, lg: 6 }}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Typography
                component="h3"
                variant="h8"
                sx={{
                  color: "white",

                  marginLeft: -45,
                }}
              >
                © 2021 Soccer Scheduler
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}></Grid>
            <Grid item xs={12} md={3}>
              <Typography
                component="h5"
                variant="h8"
                sx={{
                  color: "white",
                  textAlign: "right",
                  paddingRight: -20,
                  marginRight: -75,
                }}
              >
                Meeting your scheduling needs since the conclusion of
                DevMountain WRPT2
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
