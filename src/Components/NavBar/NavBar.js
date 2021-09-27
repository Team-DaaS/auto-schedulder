import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NavBar = () => {
  const button = {
    fontWeight: "bold",
    marginLeft: "30px",
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Soccer Schedule
          </Typography>
          <Box>
            <Button sx={button} component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button sx={button} component={Link} to="/about" color="inherit">
              About
            </Button>
            <Button
              sx={button}
              component={Link}
              to="/scheduler"
              color="inherit"
            >
              Scheduler
            </Button>
            <Button sx={button} component={Link} to="/roster" color="inherit">
              Roster
            </Button>
            <Button sx={button} component={Link} to="/import" color="inherit">
              Import
            </Button>
            <Button sx={button} component={Link} to="/contact" color="inherit">
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
