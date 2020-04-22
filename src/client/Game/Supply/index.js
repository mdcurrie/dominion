import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Supply = ({ playerId, playerRequest, supply, socket, trash }) => (
  <div className="gameSupply">
    {supply.map((c, index) => (
      <div
        key={index}
        className="gameSupplyCard"
        onClick={() => {
          if (c.count === 0) {
            return;
          }

          if (
            playerRequest &&
            playerRequest.id === playerId &&
            playerRequest.type === "CHOICE_GAIN_CARDS"
          ) {
            socket.send(
              JSON.stringify({
                type: "ASYNC_COMPLETE_CHOICE_GAIN_CARDS",
                name: c.name
              })
            );
          } else {
            socket.send(
              JSON.stringify({ type: "ASYNC_BUY_CARD", name: c.name })
            );
          }
        }}
      >
        <img
          className="gameSupplyCardImg"
          src={c.count === 0 ? "./Blank.jpg" : `./${c.name}.jpg`}
        />
        <div className="gameSupplyCardCount">{c.count}</div>
      </div>
    ))}
    <div
      className="gameSupplyCard"
      onClick={() => {
        socket.send(
          JSON.stringify({
            type: "SHOW_TRASH",
            logIds: [playerId],
            trash
          })
        );
      }}
    >
      <img className="gameSupplyCardImg" src="./Trash.jpg" />
      <div className="gameSupplyCardCount">{`Trash (${trash.length})`}</div>
    </div>
  </div>
);

Supply.propTypes = {
  playerId: PropTypes.string.isRequired,
  playerRequest: PropTypes.object,
  socket: PropTypes.object,
  supply: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  trash: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Supply;
