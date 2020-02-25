import React from "react";

const Game = ({ connections, status, game, ws, playerId }) => {
  const playerIndex = game.players.findIndex(player => player.id === playerId);
  return (
    <div>
      <div>
        <div>Supply</div>
        {game.supply.map(c => (
          <div
            onClick={() =>
              ws.send(JSON.stringify({ type: "BUY_CARD", name: c.name }))
            }
          >
            {`${c.name} --- ${c.count}`}
          </div>
        ))}
      </div>
      <div>
        <div>Hand</div>
        {game.players[playerIndex].cards.hand.map(name => (
          <div
            onClick={() =>
              ws.send(JSON.stringify({ type: "ASYNC_PLAY_CARD", name }))
            }
          >
            {name}
          </div>
        ))}
      </div>
      <div>
        <div>Details</div>
        <div>{`Actions --- ${game.currentPlayer.actions}`}</div>
        <div>{`Gold --- ${game.currentPlayer.gold}`}</div>
        <div>{`Buys --- ${game.currentPlayer.buys}`}</div>
      </div>
      <div>
        <div>Log</div>
      </div>
      <button
        onClick={() => ws.send(JSON.stringify({ type: "ASYNC_END_TURN" }))}
      >
        End Turn
      </button>
    </div>
  );
};

export default Game;
