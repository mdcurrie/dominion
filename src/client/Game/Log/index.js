import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

const isValidImageUrl = url => {
  try {
    new URL(url);
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  } catch {
    return false;
  }
};

const Log = ({ isSpectator, log, logEndRef, playerId, socket, username }) => {
  const [message, setMessage] = useState("");
  return (
    <div className="gameLogContainer">
      <div className="gameLog">
        {log.map((entry, index) => {
          if (!isSpectator && !entry.ids.includes(playerId)) {
            return null;
          }

          if (isSpectator && ["ERROR", "REQUEST"].includes(entry.type)) {
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
              {isValidImageUrl(entry.text) ? (
                <img className="gameLogEntryImage" src={entry.text} />
              ) : (
                entry.text
              )}
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
            if (isValidImageUrl(message)) {
              socket.send(
                JSON.stringify({
                  type: "ASYNC_SEND_IMAGE_URL",
                  url: message,
                  username
                })
              );
            } else {
              socket.send(
                JSON.stringify({
                  type: "ASYNC_SEND_MESSAGE",
                  entry: `(${username}) ${message}`
                })
              );
            }
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
  isSpectator: PropTypes.bool.isRequired,
  log: PropTypes.arrayOf(
    PropTypes.shape({
      ids: PropTypes.arrayOf(PropTypes.string),
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
