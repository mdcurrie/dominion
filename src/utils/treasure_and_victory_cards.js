const BASE_TREASURE_CARDS = {
  Copper: { cost: 0, value: 1, type: "TREASURE" },
  Silver: { cost: 3, value: 2, type: "TREASURE" },
  Gold: { cost: 6, value: 3, type: "TREASURE" }
};

const BASE_VICTORY_CARDS = {
  Estate: { cost: 2, value: 1, type: "VICTORY" },
  Duchy: { cost: 5, value: 3, type: "VICTORY" },
  Province: { cost: 8, value: 6, type: "VICTORY" },
  Curse: { cost: 0, value: -1, type: "CURSE" }
};

export const TREASURE_AND_VICTORY_CARDS = {
  ...BASE_TREASURE_CARDS,
  ...BASE_VICTORY_CARDS
};
