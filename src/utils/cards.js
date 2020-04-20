import { TREASURE_AND_VICTORY_CARDS } from "./treasure_and_victory_cards";
import { BASE_CARDS, BASE_SET_NAME } from "./base";
import { HINTERLANDS_CARDS, HINTERLANDS_SET_NAME } from "./hinterlands";

export const CARDS = {
  ...TREASURE_AND_VICTORY_CARDS,
  ...BASE_CARDS,
  ...HINTERLANDS_CARDS
};

// This exists for legacy purposes to keep the game randomization
// working
export const KINGDOM_CARDS = Object.keys(BASE_CARDS);

export const SET_NAMES = [BASE_SET_NAME, HINTERLANDS_SET_NAME];

// Need to handle multitype cards
export const isActionCard = card => CARDS[card].type === "ACTION";
export const isTreasureCard = card => CARDS[card].type === "TREASURE";
export const isVictoryCard = card => CARDS[card].type === "VICTORY";
export const isVictoryOrCurseCard = card =>
  isVictoryCard(card) || CARDS[card].type === "CURSE";
