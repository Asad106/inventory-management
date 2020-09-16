/** @format */

import React from "react";
import Drawer from "./Drawer";
import { Switch, Route } from "react-router-dom";
import Home from "../Dashboard/Home";
import Statictics from "../Dashboard/Statistics";

function Main() {
  return (
    <div>
      <Drawer />

      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/statistics' component={Statictics} />
      </Switch>
    </div>
  );
}

export default Main;
