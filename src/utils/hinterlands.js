import { addSetNameToCards } from "./card_utils";

export const HINTERLANDS_SET_NAME = "HINTERLANDS";

export const CARDS = {
  Crossroads: { cost: 2, type: "ACTION" },
  Duchess: { cost: 2, type: "ACTION" },
  Oasis: { cost: 3, type: "ACTION" },
  Scheme: { cost: 3, type: "ACTION" }
};

export const HINTERLANDS_CARDS = addSetNameToCards(CARDS, HINTERLANDS_SET_NAME);
