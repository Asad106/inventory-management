/** @format */

import React from "react";
import { Route, Switch, BrowserRouter, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
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
  console.log(props);
  // const { auth } = props;
  // const link = auth.uid ? (
  //   <div className='App'>
  //     <SideDrawer />

  //     <Switch>
  //       <Route exact path='/' component={Dashboard} />
  //       <Route path='/statistics' component={Statistics} />
  //       <Route path='/sales' component={Sales} />
  //       <Route path='/resolution' component={Resolution} />
  //       <Route path='/usermanagement' component={UserManagement} />
  //       <Route path='/inventory' component={InventoryManagement} />
  //       <Route path='/financial' component={FinancialManagement} />
  //       <Route path='/settings' component={Settings} />
  //       <Route path='/signin' component={SignIn} />
  //     </Switch>
  //   </div>
  // ) : (
  //   props.history.push("/signin")
  // );
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className='App'>
          <SideDrawer />

          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/statistics' component={Statistics} />
            <Route path='/sales' component={Sales} />
            <Route path='/resolution' component={Resolution} />
            <Route path='/usermanagement' component={UserManagement} />
            <Route path='/inventory' component={InventoryManagement} />
            <Route path='/financial' component={FinancialManagement} />
            <Route path='/settings' component={Settings} />
            <Route path='/signin' component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(App);
