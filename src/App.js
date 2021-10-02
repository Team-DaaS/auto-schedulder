import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import routes from "./routes";
import { Footer } from "./Components/Footer/Footer";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import 'react-calendar-timeline/lib/Timeline.css'


function App() {
  return (
    <Box>
      <NavBar />
      {routes}
      <Footer />
    </Box>
  );
}
export default App;
