import React from "react";
import Hand from "./Hand";
import Log from "./Log";
import Misc from "./Misc";
import Score from "./Score";
import SelectOptions from "./SelectOptions";
import Supply from "./Supply";
import PropTypes from "prop-types";
import "./styles.css";

const Game = ({ game, logEndRef, playerId, socket }) => {
  const playerIndex = game.players.findIndex(player => player.id === playerId);
  return (
    <div className="game">
      <div className="topRow">
        <Supply
          playerId={playerId}
          playerRequest={game.playerRequest}
          supply={game.supply}
          socket={socket}
        />
        <Log
          log={game.log}
          logEndRef={logEndRef}
          playerId={playerId}
          socket={socket}
          username={game.players[playerIndex].username}
        />
      </div>
      <div className="bottomRow">
        <Hand
          hand={game.players[playerIndex].cards.hand}
          playerId={playerId}
          playerRequest={game.playerRequest}
          socket={socket}
        />
        <Misc
          currentPlayer={game.currentPlayer}
          deck={game.players[playerIndex].cards.deck}
          discard={game.players[playerIndex].cards.discard}
          socket={socket}
        />
      </div>
      <Score score={game.score} socket={socket} />
      <SelectOptions
        playerId={playerId}
        playerRequest={game.playerRequest}
        socket={socket}
      />
    </div>
  );
};

Game.propTypes = {
  game: PropTypes.shape({
    supply: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
      })
    ),
    trash: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    players: PropTypes.arrayOf(PropTypes.object),
    currentPlayer: PropTypes.shape({
      id: PropTypes.string,
      actions: PropTypes.number.isRequired,
      buys: PropTypes.number.isRequired,
      gold: PropTypes.number.isRequired
    }),
    log: PropTypes.arrayOf(
      PropTypes.shape({
        ids: PropTypes.string,
        text: PropTypes.string,
        type: PropTypes.string
      })
    ),
    playerRequest: PropTypes.object,
    score: PropTypes.object
  }).isRequired,
  logEndRef: PropTypes.object.isRequired,
  playerId: PropTypes.string.isRequired,
  socket: PropTypes.object
};

export default Game;
