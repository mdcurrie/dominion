import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Log = ({ log, logEndRef, socket, username }) => {
  const [message, setMessage] = useState("");
  return (
    <div className="gameLogContainer">
      <div className="gameLog">
        {log.map((entry, index) => (
          <div key={index} className="gameLogMessage">
            {entry}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
      <input
        type="text"
        className="gameLogInput"
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => {
          if (event.key === "Enter") {
            socket.send(
              JSON.stringify({
                type: "ADD_TO_LOG",
                entry: `(${username}) ${message}`
              })
            );
            setMessage("");
          }
        }}
        placeholder="Send a message..."
        value={message}
      />
    </div>
  );
};

Log.propTypes = {
  log: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  logEndRef: PropTypes.object.isRequired,
  socket: PropTypes.object,
  username: PropTypes.string.isRequired
};

export default Log;
