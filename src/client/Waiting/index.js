import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Waiting = ({ usernames, socket }) => (
  <div className="waiting">
    <div className="waitingSpinner">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="waitingHeader">Waiting for players...</div>
    <div>
      {usernames.map((username, index) => (
        <div key={index} className="waitingPlayerUsername">
          {username}
        </div>
      ))}
    </div>
    {usernames.length > 1 && (
      <button
        className="waitingButton"
        onClick={() =>
          socket.send(JSON.stringify({ type: "ASYNC_START_GAME" }))
        }
      >
        Play Now!
      </button>
    )}
  </div>
);

Waiting.propTypes = {
  socket: PropTypes.object,
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Waiting;
