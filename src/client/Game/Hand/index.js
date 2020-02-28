import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Hand = ({ hand, socket }) => (
  <div className="gamePlayerHand">
    {hand.map((name, index) => (
      <img
        key={index}
        className="gamePlayerHandCardImg"
        onClick={() =>
          socket.send(JSON.stringify({ type: "ASYNC_PLAY_CARD", name }))
        }
        src={`./${name}.jpg`}
      />
    ))}
  </div>
);

Hand.propTypes = {
  hand: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  socket: PropTypes.object
};

export default Hand;
