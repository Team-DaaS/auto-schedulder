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
import { updateUserId } from "../../Redux/reducer";
import { useDispatch } from "react-redux";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //Errors handlers
  const [emptyFields, setEmptyFields] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmptyFields(false);
    setEmailError(false);
    setPasswordError(false);
    setUserError(false);
    console.log("line 39");

    if (email === "" || password === "") {
      setEmptyFields(true);
    } else {
      axios
        .post("/api/login", { email, password })
        .then((response) => {
          if (response === "User is not found") {
            console.log("line 47");
            setUserError(true);
          } else if (response === "Password does not match") {
            console.log("line 51");
            setPasswordError(true);
          } else {
            console.log(response.data);
            dispatch(updateUserId(response.data.id));
            props.history.push("/roster");
          }
        })
        .catch((e) => {
          setEmailError(true);
          setPasswordError(true);
          console.log(e);
        });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3} mb={20}>
        <Grid item xs={12}>
          <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
            Email *
          </Typography>
          <TextField
            fullWidth
            name="email"
            required
            variant="outlined"
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="textPrimary" sx={{ mb: 1 }} variant="subtitle2">
            Password *
          </Typography>
          <TextField
            fullWidth
            type="password"
            name="password"
            required
            variant="outlined"
            onChange={handlePasswordChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
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
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
      {emptyFields ? (
        <Alert severity="error">All fields are required.</Alert>
      ) : null}
      {passwordError ? (
        <Alert severity="error">All fields are required.</Alert>
      ) : null}
      {emailError ? (
        <Alert severity="error">Please enter a valid email address.</Alert>
      ) : null}
    </form>
  );
};

export default LoginForm;
