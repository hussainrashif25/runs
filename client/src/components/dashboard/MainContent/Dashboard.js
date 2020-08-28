import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";

import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    members: [],
    id: "",
    owner: {}
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, members, id, owner, e) => {
    e.stopPropagation();

    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

  render() {
    const { games } = this.props.games;

    let content;

    let gameData = games.sort().map(game => (
      <div
        key={game._id}
        className="game-icon"
        onClick={() => this.props.history.push(`/games/${game._id}`)}
      >
        <div className="game-name">{game.name}</div>
        <div
          className="game-info-button"
          onClick={this.toggleEditModal.bind(
            this,
            game.name,
            game.teamMembers,
            game._id,
            game.owner
          )}
        >
          Edit game
        </div>
        <div className="game-info-button">Go to game</div>
      </div>
    ));

    if (games.length > 0) {
      // At least one game
      content = (
        <>
          <button className="main-btn" onClick={this.toggleModal}>
            Create another game
          </button>
          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              members={this.state.members}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
          <div className="games-wrapper">{gameData}</div>
        </>
      );
    } else {
      // No games
      content = (
        <>
          <div className="games">
            <div className="no-games">
              <h1 className="header">You have no games</h1>
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first game
              </button>
              <div className="modal-wrapper">
                <Modal onClose={this.toggleModal} modal={this.state.modal} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="main-content">
        <h1 className="header">Your Games</h1>
        {content}
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
)(Dashboard);
