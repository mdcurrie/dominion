import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";
import { KINGDOM_CARDS } from "../../utils/constants";

const CardSelection = ({ selectedCards, socket }) => {
  return (
    <div className="cardSelectionContainer">
      <div className="cardSelectionHeader">Select up to 10 Kingdom Cards</div>
      <div className="cardSelectionKingdomCards">
        {KINGDOM_CARDS.map((card, index) => (
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
  selectedCards: PropTypes.arrayOf(PropTypes.string).isRequired,
  socket: PropTypes.object
};

export default CardSelection;
