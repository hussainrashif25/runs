//React
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Utils
import socketIOClient from "socket.io-client";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";


//Components 
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/404/404";

const ENDPOINT = "http://localhost:5000";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    
    // Redirect to login
    window.location.href = "./login";
  }
}
var socket;
class App extends Component {
  socket = socketIOClient(ENDPOINT);

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route component={localStorage.jwtToken ? Dashboard : NotFound}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;