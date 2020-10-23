/** @format */

import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "./Components/auth/SignIn";
import Dashboard from "./Components/Dashboard/Dashboard";
import Statistics from "./Components/layout/Statistics";
import Sales from "./Components/layout/Sales";
import Resolution from "./Components/layout/Resolution";
import UserManagement from "./Components/layout/UserManagement";
import InventoryManagement from "./Components/layout/Inventory";
import FinancialManagement from "./Components/layout/FinancialManagement";
import Settings from "./Components/layout/Settings";
import SideNavbar from "./Components/layout/SideNavbar";
import ClipLoader from "react-spinners/ClipLoader";
import AddInventory from "./Components/layout/AddInventory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  const [loading, setLoading] = useState(true);
  const { auth } = props;

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const wait = async (milliseconds) => {
    console.log("waiting for 2 seconds");
    await sleep(milliseconds);
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      wait(3500);
    };
  });

  if (auth.uid || !auth.uid) {
    // eslint-disable-next-line no-lone-blocks
    {
      if (loading) {
        return (
          <div className="loading">
            <ClipLoader size={60} color={"#123abc"} loading={loading} />
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <BrowserRouter>
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
                <Route path="/statistics" component={Statistics} />
                <Route path="/sales" component={Sales} />
                <Route path="/resolution" component={Resolution} />
                <Route path="/usermanagement" component={UserManagement} />
                <Route path="/inventory" component={InventoryManagement} />
                <Route path="/financial" component={FinancialManagement} />
                <Route path="/settings" component={Settings} />
                <Route
                  exact
                  path={["/addInventory", "/addInventory/:id"]}
                  component={AddInventory}
                />
              </Switch>
            </SideNavbar>
            <ToastContainer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  } else {
    return <SignIn />;
  }
}

// class App extends React.Component {
//   state = { loading: true };

//   sleep = (milliseconds) => {
//     return new Promise((resolve) => setTimeout(resolve, milliseconds));
//   };

//   wait = async (milliseconds = 2000) => {
//     console.log("waiting for 2 seconds");
//     await this.sleep(milliseconds);
//     this.setState({ loading: false });
//   };

//   componentDidMount() {
//     this.wait(2000);
//   }

//   componentWillUnmount() {
//     this.setState({ loading: true });
//   }

//   render() {
//     const { auth } = this.props;
//     return { if(condition) {} };
//   }
// }
const mapStateToProps = (state) => {
  //console.log(state);
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(App);
