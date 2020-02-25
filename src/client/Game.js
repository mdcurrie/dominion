import React from "react";

const Game = ({ connections, status, game, ws }) => {
  return (
    <div>
      <div>
        <div>Supply</div>
        {game.supply.map(c => (
          <div
            onClick={() =>
              ws.send(JSON.stringify({ type: "ASYNC_BUY_CARD", name: c.name }))
            }
          >
            {`${c.name} --- ${c.count}`}
          </div>
        ))}
      </div>
      <div>
        <div>Hand</div>
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
  return <div>Hello!</div>;
};

export default Game;
