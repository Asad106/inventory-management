/** @format */

import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./Components/Menu/Menu";

import SignIn from "./Components/Login/Login";
let userEmail = null;

function App() {
  useEffect(() => {
    userEmail = localStorage.getItem("email");
  }, []);

  return (
    <>
      <Switch>
        {console.log(`in render function ${userEmail}`)}
        <Route exact path='/' component={Menu} />
        <Route exact path='/signin' component={SignIn} />
      </Switch>
    </>
  );
}

export default App;
