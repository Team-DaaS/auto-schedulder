import React from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const Import = () => {
  const userId = useSelector((reduxState) => reduxState.userId);
  if (!userId) {
    return <Redirect to="/login" />;
  }
  return (
    <Box>
      <Container>
        <Box p={4}>Import</Box>
      </Container>
    </Box>
  );
};

export default Import;
