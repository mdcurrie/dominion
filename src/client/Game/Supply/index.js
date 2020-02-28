import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Supply = ({ supply, socket }) => (
  <div className="gameSupply">
    {supply.map((c, index) => (
      <div
        key={index}
        className="gameSupplyCard"
        onClick={() =>
          socket.send(JSON.stringify({ type: "ASYNC_BUY_CARD", name: c.name }))
        }
      >
        <img className="gameSupplyCardImg" src={`./${c.name}.jpg`} />
        <div className="gameSupplyCardCount">{c.count}</div>
      </div>
    ))}
  </div>
);

Supply.propTypes = {
  supply: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ),
  socket: PropTypes.object
};

export default Supply;
