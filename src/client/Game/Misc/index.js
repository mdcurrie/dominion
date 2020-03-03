import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Misc = ({ currentPlayer, deck, discard, socket }) => (
  <div className="gameExtras">
    <div className="gameExtraDetailsGroup">
      <div className="gameExtraDetails">
        <div>{`Actions: ${currentPlayer.actions}`}</div>
        <div>{`Gold: ${currentPlayer.gold}`}</div>
        <div>{`Buys: ${currentPlayer.buys}`}</div>
      </div>
      <button
        onClick={() =>
          socket.send(JSON.stringify({ type: "ASYNC_PLAY_ALL_TREASURES" }))
        }
        className="gamePlayAllTreasuresButton"
      >
        Play All Treasures
      </button>
      {/*<div className="gameExtrasDeckAndDiscard">
        <div>
          <img src="./Cellar.jpg" />
          <div>{discard.length}</div>
        </div>
        <div>
          <img src="./Chapel.jpg" />
          <div>{deck.length}</div>
        </div>
      </div>*/}
    </div>
    <button
      className="gameEndTurnButton"
      onClick={() => socket.send(JSON.stringify({ type: "ASYNC_END_TURN" }))}
    >
      End Turn
    </button>
  </div>
);

Misc.propTypes = {
  currentPlayer: PropTypes.shape({
    id: PropTypes.string,
    actions: PropTypes.number.isRequired,
    buys: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired
  }).isRequired,
  deck: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  discard: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  socket: PropTypes.object
};

export default Misc;
