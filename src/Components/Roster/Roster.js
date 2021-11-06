import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";

const Roster = () => {
  const userId = useSelector((reduxState) => reduxState.userId);
  if (!userId) {
    return <Redirect to="/login" />;
  }
  return (
    <Box>
      <Container>
        <Box p={4} m={28}>
          PDF - Coming Soon!
        </Box>
      </Container>
    </Box>
  );
};

export default Roster;
