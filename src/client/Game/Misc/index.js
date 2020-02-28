import React from "react";
import "./styles.css";

const Misc = ({ currentPlayer, ws }) => (
  <div className="gameExtras">
    <div className="gameExtraDetailsGroup">
      <div className="gameExtraDetails">
        <div>{`Actions: ${currentPlayer.actions}`}</div>
        <div>{`Gold: ${currentPlayer.gold}`}</div>
        <div>{`Buys: ${currentPlayer.buys}`}</div>
      </div>
      <button className="gamePlayAllTreasuresButton">Play All Treasures</button>
    </div>
    <button
      className="gameEndTurnButton"
      onClick={() => ws.send(JSON.stringify({ type: "ASYNC_END_TURN" }))}
    >
      End Turn
    </button>
  </div>
);

export default Misc;
