import React from "react";
import Hand from "./Hand";
import Log from "./Log";
import Misc from "./Misc";
import Supply from "./Supply";
import "./styles.css";

const Game = ({ connections, status, game, ws, playerId }) => {
  const playerIndex = game.players.findIndex(player => player.id === playerId);
  return (
    <div className="game">
      <div className="topRow">
        <Supply supply={game.supply} ws={ws} />
        <Log log={game.log} />
      </div>
      <div className="bottomRow">
        <Hand hand={game.players[playerIndex].cards.hand} ws={ws} />
        <Misc currentPlayer={game.currentPlayer} ws={ws} />
      </div>
    </div>
  );
};

export default Game;
