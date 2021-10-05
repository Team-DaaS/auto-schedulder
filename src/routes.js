import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Scheduler from "./Components/Scheduler/Scheduler";
import Roster from "./Components/Roster/Roster";
import Import from "./Components/Import/Import";
import Contact from "./Components/Contact/Contact";
import Register from "./Components/Register/Register";

export default (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
    <Route path="/scheduler" component={Scheduler} />
    <Route path="/roster" component={Roster} />
    <Route path="/import" component={Import} />
    <Route path="/contact" component={Contact} />
    <Route path="/register" component={Register} />
  </Switch>
);
