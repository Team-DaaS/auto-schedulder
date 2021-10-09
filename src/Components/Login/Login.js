import React from "react";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";
import LoginForm from "./LoginForm";

const Login = (props) => {
  return (
    <Box>
      <Box mt={5} mb={5}>
        <Container maxWidth="sm">
          <Typography variant="h3" component="h1">
            Login
          </Typography>
          <Box mt={4}>
            <LoginForm history={props.history} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
