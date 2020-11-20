/** @format */

import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "./Components/auth/SignIn";
import Dashboard from "./Components/Dashboard/Dashboard";
// import Statistics from "./Components/layout/Statistics";
import Sales from "./Components/layout/Sales";
// import Resolution from "./Components/layout/Resolution";
import UserManagement from "./Components/layout/UserManagement";
import InventoryManagement from "./Components/layout/Inventory";
import FinancialManagement from "./Components/layout/FinancialManagement";
import Settings from "./Components/layout/Settings";
import SideNavbar from "./Components/layout/SideNavbar";
import ClipLoader from "react-spinners/ClipLoader";
import AddInventory from "./Components/layout/AddInventory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUser from "./Components/layout/AddUser";
import Orders from "./Components/layout/Orders";
import Transactions from "./Components/layout/Transactions";
import Cart from "./Components/layout/Cart";
import AppFeedBacks from "./Components/layout/AppFeedBacks";
import Problems from "./Components/layout/Problems";
import Loader from "./Components/common/Loader";

function App(props) {
  const [loader, setLoader] = useState(true);
  const { auth } = props;

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const wait = async (milliseconds) => {
    console.log("waiting for 2 seconds");
    await sleep(milliseconds);
    setLoader(false);
  };

  useEffect(() => {
    return () => {
      wait(3500);
    };
  });

  console.log(props);

  if (auth.uid) {
    // eslint-disable-next-line no-lone-blocks
    {
      if (loader) {
        return <Loader open={true} />;
      }
    }

    return (
      <React.Fragment>
        <BrowserRouter>
          <Loader open={props.isLoading} />
          <div className="App">
            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <SideNavbar>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                {/* <Route path="/statistics" component={Statistics} /> */}
                <Route path="/sales" component={Sales} />
                {/* <Route path="/solve" component={Resolution} /> */}
                <Route path="/user" component={UserManagement} />
                <Route path="/inventory" component={InventoryManagement} />
                <Route path="/setting" component={Settings} />
                <Route path="/carts" component={Cart} />
                <Route path="/orders" component={Orders} />
                <Route path="/feedbacks" component={AppFeedBacks} />
                <Route path="/prosols" component={Problems} />

                <Route path="/transactions" component={Transactions} />

                <Route
                  exact
                  path={["/addInventory", "/addInventory/:id"]}
                  component={AddInventory}
                />
                <Route
                  exact
                  path={["/adduser", "/adduser/:id"]}
                  component={AddUser}
                />
              </Switch>
            </SideNavbar>
            <ToastContainer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  } else {
    return (
      <SignIn />
      // <s>
      //   <BrowserRouter>
      //     <Switch>
      //       <Route exact path={"/"} component={SignIn} />
      //       {/* <SignIn /> */}
      //       <Route exact path={"/setting"} component={Settings} />
      //       {/* <Settings /> */}
      //     </Switch>
      //   </BrowserRouter>
      // </SignIn>
      // <BrowserRouter>
      //   <SideNavbar>
      //     <Switch>
      //       <Route path={"/setting"} component={Settings} />
      //     </Switch>
      //   </SideNavbar>
      //   <Switch>
      //     <Route exact path={"/signIn"} component={SignIn} />
      //   </Switch>
      // </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    isLoading: state.loading.status,
  };
};

export default connect(mapStateToProps)(App);
