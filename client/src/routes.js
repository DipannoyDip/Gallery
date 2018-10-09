import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./components/homepage";
import AddImage from "./components/addimage";

// import About from './components/ho';
// import NotFound from './Components/NotFound/NotFound';

const Main = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/add" component={AddImage} />
        {/* <Route path='*' component={NotFound}/> */}
      </Switch>
    </BrowserRouter>
  </main>
);

export default Main;
