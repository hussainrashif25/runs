import React, { Component } from "react";
import "./MainContent.scss";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Tasks extends Component {
  state = {
    modal: false
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { games } = this.props.games;

    return (
      <div className="main-content">
        <h1 className="header">Your Tasks</h1>
        <div className="games">
          <div className="no-games">
            <h1 className="header">You have no tasks</h1>
            {games.length > 0 ? (
              <p>Visit a game to create your first task</p>
            ) : (
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first game
              </button>
            )}
            <Modal onClose={this.toggleModal} modal={this.state.modal} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games
});

export default connect(
  mapStateToProps,
  {}
)(Tasks);
