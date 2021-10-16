import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import routes from "./routes";
import { Footer } from "./Components/Footer/Footer";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import "react-calendar-timeline/lib/Timeline.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { updateUserId } from "./Redux/reducer";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();

  useEffect(() => {
    axios.get("/auth/user").then((response) => {
      dispatch(updateUserId(response.data.id));
      setUserId(response.data.id);
    });
  }, []);

  // console.log(userId);

  return (
    <Box>
      <NavBar />
      {routes}
      <Footer />
    </Box>
  );
}
export default App;
