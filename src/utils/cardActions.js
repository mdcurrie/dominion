const cardActions = {
  //   Harbinger: [
  //     { type: "DRAW_CARDS", data: { drawAmount: 1 } },
  //     { type: "GAIN_ACTIONS", data: { actionAmount: 1 } }
  //   ],
  //   Vassal: [{ type: "GAIN_FLOATING_GOLD", data: { floatingGoldAmount: 2 } }],
  //   Militia: [{ type: "GAIN_FLOATING_GOLD", data: { floatingGoldAmount: 2 } }],
  //   Poacher: [
  //     { type: "DRAW_CARDS", data: { drawAmount: 1 } },
  //     { type: "GAIN_ACTIONS", data: { actionAmount: 1 } },
  //     { type: "GAIN_FLOATING_GOLD", data: { floatingGoldAmount: 1 } }
  //   ],
  "Throne Room": [],
  Bandit: [
    {
      type: "ASYNC_GAIN_CARDS",
      data: { cardName: "Gold", gainAmount: 1, location: "DISCARD" }
    }
  ]
  //   Library: [],
  //   Sentry: [
  //     { type: "DRAW_CARDS", data: { drawAmount: 1 } },
  //     { type: "GAIN_ACTIONS", data: { actionAmount: 1 } }
  //   ],
};

export default cardActions;
