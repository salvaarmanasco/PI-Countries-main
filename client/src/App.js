import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import ActivityCreate from "./Components/ActivityCreate";
import CountryDetail from "./Components/CountryDetail";
import NotFound from "./Components/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/activities" component={ActivityCreate} />
        <Route exact path="/countries/:id" component={CountryDetail} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
