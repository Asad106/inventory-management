/** @format */

import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "./Components/auth/SignIn";
import Dashboard from "./Components/Dashboard/Dashboard";
import SideDrawer from "./Components/layout/SideDrawer";
import Statistics from "./Components/layout/Statistics";
import Sales from "./Components/layout/Sales";
import Resolution from "./Components/layout/Resolution";
import UserManagement from "./Components/layout/UserManagement";
import InventoryManagement from "./Components/layout/InventoryManagement";
import FinancialManagement from "./Components/layout/FinancialManagement";
import Settings from "./Components/layout/Settings";

function App(props) {
  const { auth } = props;

  if (auth.uid) {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className='App'>
            <div className='side-drawer'>
              {auth.uid ? <SideDrawer /> : null}
            </div>
            <div className='side-drawer-content'>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/statistics' component={Statistics} />
                <Route path='/sales' component={Sales} />
                <Route path='/resolution' component={Resolution} />
                <Route path='/usermanagement' component={UserManagement} />
                <Route path='/inventory' component={InventoryManagement} />
                <Route path='/financial' component={FinancialManagement} />
                <Route path='/settings' component={Settings} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  } else {
    return <SignIn />;
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(App);
