import React from "react";
import "./styles.css";

const Hand = ({ hand, ws }) => (
  <div className="gamePlayerHand">
    {hand.map(name => (
      <img
        className="gamePlayerHandCardImg"
        onClick={() =>
          ws.send(JSON.stringify({ type: "ASYNC_PLAY_CARD", name }))
        }
        src={`./${name}.jpg`}
      />
    ))}
  </div>
);

export default Hand;
