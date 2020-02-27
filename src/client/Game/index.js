import React from "react";
import styles from "./styles.css";

const Game = ({ connections, status, game, ws, playerId }) => {
  const playerIndex = game.players.findIndex(player => player.id === playerId);
  return (
    <div className="game">
      <div className="topRow">
        <div className="gameSupply">
          {game.supply.map(c => (
            <div
              className="gameSupplyCard"
              onClick={() =>
                ws.send(
                  JSON.stringify({ type: "ASYNC_BUY_CARD", name: c.name })
                )
              }
            >
              <img className="gameSupplyCardImg" src={`./${c.name}.jpg`} />
              <div className="gameSupplyCardCount">{c.count}</div>
            </div>
          ))}
        </div>
        <div className="gameLog">
          {game.log.map(l => (
            <div className="gameLogMessage">{l}</div>
          ))}
        </div>
      </div>
      <div className="bottomRow">
        <div className="gamePlayerHand">
          {game.players[playerIndex].cards.hand.map(name => (
            <img
              className="gamePlayerHandCardImg"
              onClick={() =>
                ws.send(JSON.stringify({ type: "ASYNC_PLAY_CARD", name }))
              }
              src={`./${name}.jpg`}
            />
          ))}
        </div>
        <div className="gameExtras">
          <div className="gameExtraDetailsGroup">
            <div className="gameExtraDetails">
              <div>{`Actions: ${game.currentPlayer.actions}`}</div>
              <div>{`Gold: ${game.currentPlayer.gold}`}</div>
              <div>{`Buys: ${game.currentPlayer.buys}`}</div>
            </div>
            <button className="gamePlayAllTreasuresButton">
              Play All Treasures
            </button>
          </div>
          <button className="gameEndTurnButton"
            onClick={() => ws.send(JSON.stringify({ type: "ASYNC_END_TURN" }))}
          >
            End Turn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
