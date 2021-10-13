import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import { clearReduxState } from "../../Redux/reducer";
// import { HistoryOutlined } from "@material-ui/icons";

const NavBar = () => {
  const userId = useSelector((reduxState) => reduxState.userId);
  const dispatch = useDispatch();
  let history = useHistory();

  const button = {
    fontWeight: "bold",
    marginLeft: "30px",
  };

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.delete("/api/logout").then((res) => {
      dispatch(clearReduxState());
      history.push("/login");
    });
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
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              },
            }}
          >
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
            <Button sx={button} onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              sx={{ fontSize: "13px" }}
              component={Link}
              to="/"
            >
              HOME
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ fontSize: "13px" }}
              component={Link}
              to="/about"
            >
              ABOUT
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ fontSize: "13px" }}
              component={Link}
              to="/scheduler"
            >
              SCHEDULER
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ fontSize: "13px" }}
              component={Link}
              to="/roster"
            >
              ROSTER
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ fontSize: "13px" }}
              component={Link}
              to="/import"
            >
              IMPORT
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{ fontSize: "13px" }}
              component={Link}
              to="/contact"
            >
              CONTACT
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
