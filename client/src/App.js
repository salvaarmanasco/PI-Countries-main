import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import ActivityCreate from "./Components/ActivityCreate";
import CountryDetail from "./Components/CountryDetail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/activities" component={ActivityCreate} />
        <Route exact path="/countries/:id" component={CountryDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
