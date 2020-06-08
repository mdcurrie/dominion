import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const SelectOptions = ({ playerId, playerRequest, socket }) =>
  playerRequest &&
  playerRequest.id === playerId &&
  playerRequest.type === "SELECT_OPTIONS" ? (
    <div className="gameSelectOptionsContainer">
      <div className="gameSelectOptionsModal">
        {playerRequest.flavorImage ? (
          <div className="gameSelectOptionsHeader">
            <img
              className="gameSelectOptionsFlavorImage"
              src={playerRequest.flavorImage}
            ></img>
          </div>
        ) : null}
        <div className="gameSelectOptionsText">{playerRequest.text}</div>
        <div className="gameSelectOptionsButtons">
          {playerRequest.options.map((option, index) => (
            <button
              key={index}
              className="gameSelectOptionsButton"
              onClick={() =>
                socket.send(
                  JSON.stringify({
                    type: "ASYNC_COMPLETE_SELECT_OPTIONS",
                    next: option.next
                  })
                )
              }
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  ) : null;

SelectOptions.propTypes = {
  playerId: PropTypes.string.isRequired,
  playerRequest: PropTypes.object,
  socket: PropTypes.object
};

export default SelectOptions;
