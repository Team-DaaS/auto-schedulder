import React from "react";
import RegisterForm from "./RegisterForm";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";

const Register = (props) => {
  return (
    <Box>
      <Box mt={5} mb={5}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h3">
            Register
          </Typography>
          <Box mt={4}>
            <RegisterForm history={props.history} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Register;
