import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import "./styles.css";

const Supply = ({ playerRequest, supply, socket }) => (
  <div className="gameSupply">
    {supply.map((c, index) => (
      <div
        key={index}
        className="gameSupplyCard"
        onClick={() =>
          c.count === 0
            ? noop()
            : socket.send(
                JSON.stringify({ type: "ASYNC_BUY_CARD", name: c.name })
              )
        }
      >
        <img
          className="gameSupplyCardImg"
          src={c.count === 0 ? "./Blank.jpg" : `./${c.name}.jpg`}
        />
        <div className="gameSupplyCardCount">{c.count}</div>
      </div>
    ))}
  </div>
);

Supply.propTypes = {
  playerRequest: PropTypes.object,
  supply: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ),
  socket: PropTypes.object
};

export default Supply;
