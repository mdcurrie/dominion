import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

const Hand = ({ hand, playerId, playerRequest, socket }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  if (
    selectedCards.length > 0 &&
    (!playerRequest ||
      playerRequest.id !== playerId ||
      playerRequest.type !== "SELECT_CARDS_IN_HAND")
  ) {
    setSelectedCards([]);
  }

  function handleCardClick(name, index) {
    let selectedCardsCopy = [...selectedCards];
    if (
      playerRequest &&
      playerRequest.id === playerId &&
      playerRequest.type === "SELECT_CARDS_IN_HAND"
    ) {
      if (selectedCardsCopy.includes(index)) {
        selectedCardsCopy = [
          ...selectedCards.slice(0, index),
          ...selectedCardsCopy.slice(index + 1)
        ];
      } else {
        selectedCardsCopy.push(index);
        if (selectedCardsCopy.length > playerRequest.selectAmount) {
          selectedCardsCopy.shift();
        }
      }
      setSelectedCards(selectedCardsCopy);
    } else {
      socket.send(JSON.stringify({ type: "ASYNC_PLAY_CARD", name }));
    }
  }

  return (
    <div className="gamePlayerHandContainer">
      <div className="gamePlayerHand">
        {hand.map((name, index) => (
          <img
            key={index}
            className={classNames("gamePlayerHandCardImg", {
              gamePlayerHandCardImgSelected: selectedCards.includes(index)
            })}
            onClick={() => handleCardClick(name, index)}
            src={`./${name}.jpg`}
          />
        ))}
      </div>
      {playerRequest &&
        playerRequest.id === playerId &&
        playerRequest.type === "SELECT_CARDS_IN_HAND" && (
          <button
            className="gamePlayerHandButton"
            onClick={() =>
              socket.send(
                JSON.stringify({
                  type: "ASYNC_COMPLETE_SELECT_CARDS_IN_HAND",
                  cardIndexes: selectedCards
                })
              )
            }
          >
            Done Selecting
          </button>
        )}
    </div>
  );
};

Hand.propTypes = {
  hand: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  playerId: PropTypes.string.isRequired,
  playerRequest: PropTypes.object,
  socket: PropTypes.object
};

export default Hand;
