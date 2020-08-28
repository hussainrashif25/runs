import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGames } from "../../actions/gamesActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Spinner from "../common/Spinner";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import Tasks from "./MainContent/Tasks";
import Game from "./MainContent/Game/Game";
import NotFound from "../404/404";

import "./Layout.scss";

class Layout extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  render() {
    const { games, gamesLoading } = this.props.games;

    let dashboardContent;

    if (games === null || gamesLoading) {
      dashboardContent = <Spinner />;
    } else if (games.length > 0) {
      dashboardContent = (
        <>
          <SideNav games={games} />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                games={games}
                component={Dashboard}
              />
              <Route
                exact
                path="/tasks"
                games={games}
                component={Tasks}
              />
              <Route exact path="/games/:game" component={Game} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    } else {
      dashboardContent = (
        <>
          <SideNav />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                games={[]}
                component={Dashboard}
              />
              <Route exact path="/tasks" component={Tasks} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    }

    return (
      <Router>
        <div className="wrapper">{dashboardContent}</div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  games: state.games
});

export default withRouter(
  connect(
    mapStateToProps,
    { getGames }
  )(Layout)
);
