import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import shuffle from "lodash/shuffle";

import "./styles.css";

const CardSelection = ({ cards, cardPoolSize, selectedCards, socket }) => {
  // The cards available should be a random set of 10 + number of players of the
  // possible cards that you can pick from
  const possibleCards = shuffle(cards).slice(0, cardPoolSize);
  return (
    <div className="cardSelectionContainer">
      <div className="cardSelectionHeader">Select up to 10 Kingdom Cards</div>
      <div className="cardSelectionKingdomCards">
        {possibleCards.map((card, index) => (
          <div
            key={index}
            className={classNames("cardSelectionKingdomCard", {
              cardSelectionKingdomCardSelected: selectedCards.includes(card)
            })}
            onClick={() =>
              socket.send(
                JSON.stringify({
                  type: "PREGAME_CARD_SELECT",
                  card
                })
              )
            }
          >
            <img
              className="cardSelectionKingdomCardImg"
              src={`./${card}.jpg`}
            />
          </div>
        ))}
      </div>
      <button
        className="cardSelectionButton"
        onClick={() =>
          socket.send(JSON.stringify({ type: "ASYNC_START_GAME" }))
        }
      >
        Start Game!
      </button>
    </div>
  );
};

CardSelection.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  cardPoolSize: PropTypes.number,
  selectedCards: PropTypes.arrayOf(PropTypes.string).isRequired,
  socket: PropTypes.object
};

export default CardSelection;
