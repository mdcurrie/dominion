const cardActions = {
  Cellar: [],
  Chapel: [],
  Moat: [{ type: "DRAW_CARDS", data: { drawAmount: 2 } }],
  Harbinger: [],
  Merchant: [],
  Vassal: [],
  Village: [
    { type: "DRAW_CARDS", data: { drawAmount: 1 } },
    { type: "GAIN_ACTIONS", data: { actionAmount: 2 } }
  ],
  Workshop: [],
  Bureaucrat: [],
  Gardens: [],
  Militia: [],
  Moneylender: [],
  Poacher: [],
  Remodel: [],
  Smithy: [{ type: "DRAW_CARDS", data: { drawAmount: 3 } }],
  "Throne Room": [],
  Bandit: [],
  "Council Room": [],
  Festival: [
    { type: "GAIN_ACTIONS", data: { actionAmount: 2 } },
    { type: "GAIN_BUYS", data: { buyAmount: 1 } },
    { type: "GAIN_FLOATING_GOLD", data: { floatingGoldAmount: 2 } }
  ],
  Laboratory: [
    { type: "DRAW_CARDS", data: { drawAmount: 2 } },
    { type: "GAIN_ACTIONS", data: { actionAmount: 1 } }
  ],
  Library: [],
  Market: [
    { type: "DRAW_CARDS", data: { drawAmount: 1 } },
    { type: "GAIN_ACTIONS", data: { actionAmount: 1 } },
    { type: "GAIN_BUYS", data: { buyAmount: 1 } },
    { type: "GAIN_FLOATING_GOLD", data: { floatingGoldAmount: 1 } }
  ],
  Mine: [],
  Sentry: [],
  Witch: [],
  Artisan: []
};

export default cardActions;
