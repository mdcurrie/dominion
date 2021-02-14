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

  function handleCardClick(cardName, cardIndex) {
    let selectedCardsCopy = [...selectedCards];
    if (
      playerRequest &&
      playerRequest.id === playerId &&
      playerRequest.type === "SELECT_CARDS_IN_HAND"
    ) {
      if (selectedCardsCopy.includes(cardIndex)) {
        let selectedIndex = selectedCardsCopy.indexOf(cardIndex);
        selectedCardsCopy = [
          ...selectedCardsCopy.slice(0, selectedIndex),
          ...selectedCardsCopy.slice(selectedIndex + 1)
        ];
      } else {
        selectedCardsCopy.push(cardIndex);
        if (
          playerRequest.maxSelectAmount != null &&
          selectedCardsCopy.length > playerRequest.maxSelectAmount
        ) {
          selectedCardsCopy.shift();
        }
      }
      setSelectedCards(selectedCardsCopy);
    } else {
      socket.send(
        JSON.stringify({ type: "ASYNC_PLAY_CARD", cardName, cardIndex })
      );
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
