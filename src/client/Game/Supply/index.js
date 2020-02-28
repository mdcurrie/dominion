import React from "react";
import "./styles.css";

const Supply = ({ supply, ws }) => (
  <div className="gameSupply">
    {supply.map(c => (
      <div
        className="gameSupplyCard"
        onClick={() =>
          ws.send(JSON.stringify({ type: "ASYNC_BUY_CARD", name: c.name }))
        }
      >
        <img className="gameSupplyCardImg" src={`./${c.name}.jpg`} />
        <div className="gameSupplyCardCount">{c.count}</div>
      </div>
    ))}
  </div>
);

export default Supply;
