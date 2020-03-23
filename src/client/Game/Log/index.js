import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

const Log = ({ log, logEndRef, playerId, socket, username }) => {
  const [message, setMessage] = useState("");
  return (
    <div className="gameLogContainer">
      <div className="gameLog">
        {log.map((entry, index) => {
          if (!entry.ids.includes(playerId)) {
            return null;
          }

          return (
            <div
              key={index}
              className={classNames("gameLogEntry", {
                gameLogEntryError: entry.type === "ERROR",
                gameLogEntryMessage: entry.type === "MESSAGE",
                gameLogEntryRequest: entry.type === "REQUEST"
              })}
            >
              {entry.text}
            </div>
          );
        })}
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
                type: "ASYNC_SEND_MESSAGE",
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
  log: PropTypes.arrayOf(
    PropTypes.shape({
      ids: PropTypes.string,
      text: PropTypes.string,
      type: PropTypes.string
    })
  ),
  logEndRef: PropTypes.object.isRequired,
  playerId: PropTypes.string.isRequired,
  socket: PropTypes.object,
  username: PropTypes.string.isRequired
};

export default Log;
