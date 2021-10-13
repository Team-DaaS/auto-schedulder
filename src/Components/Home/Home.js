import React from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  // const userId = useSelector((reduxState) => reduxState.userId);
  // console.log(userId);
  return (
    <Box>
      <Container>
        <Box p={4}>Home</Box>
      </Container>
    </Box>
  );
};

export default Home;
