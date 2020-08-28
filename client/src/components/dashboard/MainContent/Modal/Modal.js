import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createGame,
  updateGame,
  deleteGame
} from "../../../../actions/gamesActions";
/*
import {
  createTask,
  deleteTask,
  updateTask
} from "../../../../actions/taskActions";
*/

import moment from "moment";

import "./Modal.scss";

class Modal extends Component {
  state = {
    gameName: "",
    members: [{ name: "", email: "" }],
    //taskName: "",
    assignee: "",
    monthDue: "",
    dayDue: "",
    //taskId: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        gameName: nextProps.name,
        members: nextProps.members
      });
    } else if (nextProps.editTask) {
      this.setState({
        taskName: nextProps.taskName
      });
    }
  }

  onChange = e => {
    if (["name", "email"].includes(e.target.name)) {
      let members = [...this.state.members];
      members[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ members });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  addMember = e => {
    this.setState(prevState => ({
      members: [...prevState.members, { name: "", email: "" }]
    }));
  };

  deleteMember = index => {
    let array = [...this.state.members];
    array.splice(index, 1);
    this.setState({ members: array });
  };

  createGame = () => {
    let game = {
      gameName: this.state.gameName,
      members: this.state.members
    };

    this.props.createGame(game);
    this.onClose();
  };

  updateGame = async id => {
    let game = {
      id: this.props.id,
      gameName: this.state.gameName,
      members: this.state.members
    };

    await this.props.updateGame(game);

    this.onClose();
    window.location.reload();
  };

  deleteGame = id => {
    this.props.deleteGame(id, this.props.history);
    this.onClose();
  };
/*
  deleteTask = id => {
    this.props.deleteTask(id);
    this.onClose();
  };
*/
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      gameName: "",
      taskName: "",
      assignee: "",
      monthDue: "",
      dayDue: "",
      members: [{ name: "", email: "" }]
    });
  };

  onSelectChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
/*
  createTask = e => {
    e.preventDefault();

    let fullDate =
      this.state.monthDue +
      "-" +
      this.state.dayDue +
      "-" +
      Date().split(" ")[3];

    let momentDate = moment(fullDate, "MM-DD-YYYY")
      ._d.toString()
      .split(" ");

    let finalDate = momentDate[1] + " " + momentDate[2];

    const data = {
      game: this.props.games.game._id,
      taskName: this.state.taskName,
      assignee: this.state.assignee,
      dateDue: finalDate
    };

    this.props.createTask(data);

    this.onClose();
  };

  updateTask = id => {
    let finalDate;

    let dates = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    if (!this.state.monthDue && !this.state.dayDue) {
      finalDate = this.props.dateDue;
    } else if (
      this.props.dateDue &&
      this.props.dateDue !== "Date undefined" &&
      !this.state.monthDue &&
      this.state.dayDue
    ) {
      let fullDate =
        dates.indexOf(this.props.dateDue.split(" ")[0]) +
        1 +
        "-" +
        this.state.dayDue +
        "-" +
        Date().split(" ")[3];

      let momentDate = moment(fullDate, "MM-DD-YYYY")
        ._d.toString()
        .split(" ");

      finalDate = momentDate[1] + " " + momentDate[2];
    } else if (
      this.props.dateDue &&
      this.props.dateDue !== "Date undefined" &&
      !this.state.dayDue &&
      this.state.monthDue
    ) {
      let fullDate =
        this.state.monthDue +
        "-" +
        this.props.dateDue.split(" ")[1] +
        "-" +
        Date().split(" ")[3];

      let momentDate = moment(fullDate, "MM-DD-YYYY")
        ._d.toString()
        .split(" ");

      finalDate = momentDate[1] + " " + momentDate[2];
    } else {
      let fullDate =
        this.state.monthDue +
        "-" +
        this.state.dayDue +
        "-" +
        Date().split(" ")[3];

      let momentDate = moment(fullDate, "MM-DD-YYYY")
        ._d.toString()
        .split(" ");

      finalDate = momentDate[1] + " " + momentDate[2];
    }

    let task = {
      id: id,
      taskName: this.state.taskName,
      dateDue: finalDate,
      assignee: this.state.assignee || this.props.assignee
    };

    this.props.updateTask(task);

    this.onClose();
  };
  */

  render() {
    
    if (!this.props.modal) {
      return null;
    }

    document.onkeyup = e => {
      if (e.keyCode === 27 && this.props.modal) {
        this.onClose();
      }
    };

    let { members } = this.state;
/*
    // Create task modal
    if (this.props.task) {
      const { teamMembers } = this.props.games.game;
      const { name, email } = this.props.auth.user;

      // Assignee dropdown in Modal
      let membersOptions = teamMembers.map((member, index) => (
        <option key={index} value={member.email}>
          {member.name}
        </option>
      ));

      // Due date dropdown in Modal
      const MONTHS = new Array(12).fill(1);
      const DAYS = new Array(31).fill(1);

      let monthsOptions = MONTHS.map((month, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      let daysOptions = DAYS.map((day, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      return (
        <form onSubmit={this.createTask} className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create task</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Task Name (required)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.taskName}
                id="taskName"
                type="text"
                placeholder={"What is the task?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
              <label>
                <div className="form-label">Assignee</div>
                <select
                  onChange={this.onSelectChange}
                  value={this.state.assignee}
                  id="assignee"
                  type="text"
                  className="form-input task-input-split"
                >
                  <option disabled value="">
                    Assign to
                  </option>
                  <option value={email}>{name + " (You)"}</option>
                  {membersOptions}
                </select>
              </label>
              <label>
                <div className="form-label">Due Date</div>
                <div className="split">
                  <select
                    required={this.state.dayDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.monthDue}
                    id="monthDue"
                    type="text"
                    className="form-input task-input-split month-due"
                  >
                    <option disabled value="">
                      Month
                    </option>
                    {monthsOptions}
                  </select>
                  <select
                    required={this.state.monthDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.dayDue}
                    id="dayDue"
                    type="text"
                    className="form-input task-input-split"
                  >
                    <option disabled value="">
                      Day
                    </option>
                    {daysOptions}
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div>
            <button className="main-btn update-game" type="submit">
              Create Task
            </button>
          </div>
        </form>
      );
    }

    // Edit Task Modal
    else if (this.props.editTask) {
      const { teamMembers } = this.props.games.game;
      const { name, email } = this.props.auth.user;

      const { assignee, dateDue, taskId } = this.props;
      let assigneeName;

      let assignedMonth = moment(dateDue).month() + 1;
      let assignedDay = dateDue.split(" ")[1];

      // Find name from email
      teamMembers.forEach(member => {
        if (member.email === assignee) {
          assigneeName = member.name;
        } else if (assignee) {
          assigneeName = name + " (You)";
        }
      });

      // Assignee dropdown in Modal
      let membersOptions = teamMembers.map((member, index) => {
        if (member.name !== assigneeName) {
          return (
            <option key={member._id} value={member.email}>
              {member.name}
            </option>
          );
        }
        return null;
      });

      // Due date dropdown in Modal
      const MONTHS = new Array(12).fill(1);
      const DAYS = new Array(31).fill(1);

      let monthsOptions = MONTHS.map((month, i) => {
        return (
          <option key={i} value={i + 1}>
            {i < 9 && "0"}
            {i + 1}
          </option>
        );
      });

      let daysOptions = DAYS.map((day, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      return (
        <form className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit task</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Task Name (required)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.taskName}
                id="taskName"
                type="text"
                placeholder={"What is the task?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
              <label>
                <div className="form-label">Assignee</div>
                <select
                  onChange={this.onSelectChange}
                  value={this.state.assignee}
                  id="assignee"
                  type="text"
                  className="form-input task-input-split"
                >
                  {!assignee && (
                    <option disabled value="">
                      Assign to
                    </option>
                  )}
                  {assignee && <option value={assignee}>{assigneeName}</option>}
                  {assigneeName !== name + " (You)" && (
                    <option value={email}>{name + " (You)"}</option>
                  )}
                  {membersOptions}
                </select>
              </label>
              <label>
                <div className="form-label">Due Date</div>
                <div className="split">
                  <select
                    required={this.state.dayDue ? true : false}
                    onChange={this.onSelectChange}
                    value={
                      this.state.monthDue || parseInt(assignedMonth).toString()
                    }
                    id="monthDue"
                    type="text"
                    className="form-input task-input-split month-due"
                  >
                    {!dateDue && (
                      <option disabled value="">
                        Month
                      </option>
                    )}
                    {monthsOptions}
                  </select>
                  <select
                    required={this.state.monthDue ? true : false}
                    onChange={this.onSelectChange}
                    value={
                      this.state.dayDue || parseInt(assignedDay).toString()
                    }
                    id="dayDue"
                    type="text"
                    className="form-input task-input-split"
                  >
                    {!dateDue && (
                      <option disabled value="">
                        Day
                      </option>
                    )}
                    {daysOptions}
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div>
            <button
              className="main-btn update-game"
              type="button"
              onClick={this.updateTask.bind(this, taskId)}
            >
              Update Task
            </button>
            <button
              className="main-btn delete-game"
              onClick={this.deleteTask.bind(this, taskId)}
            >
              Delete Task
            </button>
          </div>
        </form>
      );
    }
    */

    // Edit game modal
    if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit Game Info</h1>
          <p className="created-by">
            Created by {this.props.owner.name} ({this.props.owner.email})
          </p>
          <div className="form-group">
            <label>
              <div className="form-label">Game Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.gameName}
                id="gameName"
                type="text"
                placeholder={"My Awesome Game"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-label">Add team members (optional)</div>
          <button className="main-btn add-members" onClick={this.addMember}>
            Add another member
          </button>
          <div className="members-edit">
            {members.map((val, id) => {
              let memberId = `member-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={memberId}>
                    Name (required for teams)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={memberId}
                      value={members[id].name}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <label className="form-label split-email" htmlFor={emailId}>
                    Email (required for teams)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={members[id].email}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deleteMember.bind(this, id)}
                  >
                    REMOVE
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="main-btn update-game"
              onClick={this.updateGame.bind(this, this.props.id)}
            >
              Update Game
            </button>
            {this.props.owner.id === this.props.auth.user.id ? (
              <button
                className="main-btn delete-game"
                onClick={this.deleteGame.bind(this, this.props.id)}
              >
                Delete Game
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    // Create game modal
    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create a game</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Game Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.gameName}
                id="gameName"
                type="text"
                placeholder="My Awesome Game"
                className="form-input"
              />
            </label>
          </div>
          <div className="form-label">Add team members (optional)</div>
          <button className="main-btn add-members" onClick={this.addMember}>
            Add another member
          </button>
          <div className="members">
            {members.map((val, id) => {
              let memberId = `member-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={memberId}>
                    Name (required for teams)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={memberId}
                      value={members[id].name}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <label className="form-label split-email" htmlFor={emailId}>
                    Email (required for teams)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={members[id].email}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deleteMember.bind(this, id)}
                  >
                    REMOVE
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="main-btn create-game"
              onClick={this.createGame}
            >
              Create Game
            </button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  games: state.games,
//  tasks: state.tasks
});

export default connect(
  mapStateToProps,
  {
    createGame,
    updateGame,
    deleteGame
    /*
    createTask,
    deleteTask,
    updateTask
    */
  }
)(withRouter(Modal));
