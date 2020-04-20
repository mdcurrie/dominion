import { addSetNameToCards } from "./card_utils";

export const BASE_SET_NAME = "BASE";

const CARDS = {
  Cellar: { cost: 2, type: "ACTION" },
  Chapel: { cost: 2, type: "ACTION" },
  Moat: { cost: 2, type: "ACTION" },
  Harbinger: { cost: 3, type: "ACTION" },
  Merchant: { cost: 3, type: "ACTION" },
  Vassal: { cost: 3, type: "ACTION" },
  Village: { cost: 3, type: "ACTION" },
  Workshop: { cost: 3, type: "ACTION" },
  Bureaucrat: { cost: 4, type: "ACTION" },
  Gardens: { cost: 4, type: "ACTION" },
  Militia: { cost: 4, type: "ACTION" },
  Moneylender: { cost: 4, type: "ACTION" },
  Poacher: { cost: 4, type: "ACTION" },
  Remodel: { cost: 4, type: "ACTION" },
  Smithy: { cost: 4, type: "ACTION" },
  Bandit: { cost: 5, type: "ACTION" },
  "Council Room": { cost: 5, type: "ACTION" },
  Festival: { cost: 5, type: "ACTION" },
  Laboratory: { cost: 5, type: "ACTION" },
  Library: { cost: 5, type: "ACTION" },
  Market: { cost: 5, type: "ACTION" },
  Mine: { cost: 5, type: "ACTION" },
  Sentry: { cost: 5, type: "ACTION" },
  Witch: { cost: 5, type: "ACTION" },
  Artisan: { cost: 5, type: "ACTION" }
};

// Adding set name attribute to each card
export const BASE_CARDS = addSetNameToCards(CARDS, BASE_SET_NAME);
