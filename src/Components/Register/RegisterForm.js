import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Link,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
// import { Button } from "@mui/material";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [league_name, setLeagueName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const [anyEmptyError, setAnyEmptyError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [confPassError, setConfPassError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleLeagueNameChange = (e) => setLeagueName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfChange = (e) => setPasswordConf(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    setAnyEmptyError(false);
    setEmailError(false);
    setConfPassError(false);
    setUserError(false);

    if (
      email === "" ||
      league_name === "" ||
      password === "" ||
      passwordConf === ""
    ) {
      setAnyEmptyError(true);
    } else {
      if (!email.includes("@")) {
        setEmailError(true);
      } else {
        if (password !== passwordConf) {
          setConfPassError(true);
        } else {
          axios
            .post("/api/register", { email, password, league_name })
            .then((response) => {
              console.log(response);
            })
            .catch((e) => {
              setUserError(true);
            });
        }
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
            Email *
          </Typography>
          <TextField
            fullWidth
            name="name"
            required
            variant="outlined"
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
            League Name *
          </Typography>
          <TextField
            fullWidth
            name="name"
            required
            variant="outlined"
            onChange={handleLeagueNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
            Password *
          </Typography>
          <TextField
            fullWidth
            name="name"
            required
            variant="outlined"
            type="password"
            onChange={handlePasswordChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
            Confirm Password *
          </Typography>
          <TextField
            fullWidth
            name="name"
            required
            variant="outlined"
            type="password"
            onChange={handlePasswordConfChange}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          mb: 3,
        }}
      >
        <Button
          color="primary"
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          Register
        </Button>
      </Box>
      {anyEmptyError ? (
        <Alert severity="error">All fields are required.</Alert>
      ) : null}
      {emailError ? (
        <Alert severity="error">Please enter a valid email address.</Alert>
      ) : null}
      {confPassError ? (
        <Alert severity="error">
          Password and Confirm Password have to be the same.
        </Alert>
      ) : null}
      {userError ? (
        <Alert severity="error">That email is already in use.</Alert>
      ) : null}
    </form>
  );
};

export default ContactForm;
