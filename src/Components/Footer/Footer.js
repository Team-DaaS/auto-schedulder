import React from "react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";

export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#E8E8E8" }}>
      <Container maxWidth="lg">
        <Box p={{ xs: 4, md: 6, lg: 6 }}>
          <Grid container>
            <Grid item xs={12} md={3}>
              Column 1
            </Grid>
            <Grid item xs={12} md={3}>
              Column 2
            </Grid>
            <Grid item xs={12} md={3}>
              Column 3
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
