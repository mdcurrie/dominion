const cardActions = {
  Cellar: [
    {
      type: "SELECT_CARDS_IN_HAND",
      data: {
        minSelectAmount: 0,
        maxSelectAmount: null,
        onSelect: {
          type: "ASYNC_DISCARD_SELECTED_CARDS",
          data: {
            onDiscard: { type: "DRAW_CARDS" }
          }
        }
      }
    }
  ],
  Chapel: [
    {
      type: "SELECT_CARDS_IN_HAND",
      data: {
        minSelectAmount: 0,
        maxSelectAmount: 4,
        onSelect: {
          type: "TRASH_SELECTED_CARDS",
          data: {}
        }
      }
    }
  ],
  //   Harbinger: [
  //     { type: "DRAW_CARDS", data: { drawAmount: 1 } },
  //     { type: "GAIN_ACTIONS", data: { actionAmount: 1 } }
  //   ],
  //   Vassal: [{ type: "GAIN_FLOATING_GOLD", data: { floatingGoldAmount: 2 } }],
  Workshop: [
    {
      type: "CHOICE_GAIN_CARDS",
      data: { gainAmount: 1, maxCost: 4, location: "DISCARD" }
    }
  ],
  //   Militia: [{ type: "GAIN_FLOATING_GOLD", data: { floatingGoldAmount: 2 } }],
  //   Poacher: [
  //     { type: "DRAW_CARDS", data: { drawAmount: 1 } },
  //     { type: "GAIN_ACTIONS", data: { actionAmount: 1 } },
  //     { type: "GAIN_FLOATING_GOLD", data: { floatingGoldAmount: 1 } }
  //   ],
  Remodel: [
    {
      type: "SELECT_CARDS_IN_HAND",
      data: {
        minSelectAmount: 1,
        maxSelectAmount: 1,
        choiceGainAdditionalCost: 2,
        onSelect: [
          {
            type: "TRASH_SELECTED_CARDS",
            data: {}
          },
          {
            type: "CHOICE_GAIN_CARDS",
            data: { gainAmount: 1, location: "DISCARD" }
          }
        ]
      }
    }
  ],
  "Throne Room": [],
  Bandit: [
    {
      type: "ASYNC_GAIN_CARDS",
      data: { cardName: "Gold", gainAmount: 1, location: "DISCARD" }
    }
  ],
  //   Library: [],
  Mine: [
    {
      type: "SELECT_CARDS_IN_HAND",
      data: {
        minSelectAmount: 1,
        maxSelectAmount: 1,
        choiceGainAdditionalCost: 3,
        cardType: "TREASURE",
        onSelect: [
          {
            type: "TRASH_SELECTED_CARDS",
            data: {}
          },
          {
            type: "CHOICE_GAIN_CARDS",
            data: { gainAmount: 1, location: "HAND", cardType: "TREASURE" }
          }
        ]
      }
    }
  ],
  //   Sentry: [
  //     { type: "DRAW_CARDS", data: { drawAmount: 1 } },
  //     { type: "GAIN_ACTIONS", data: { actionAmount: 1 } }
  //   ],
  Artisan: [
    {
      type: "CHOICE_GAIN_CARDS",
      data: {
        gainAmount: 1,
        maxCost: 5,
        location: "HAND",
        onChoice: {
          type: "SELECT_CARDS_IN_HAND",
          data: {
            minSelectAmount: 1,
            maxSelectAmount: 1,
            onSelect: {
              type: "PLACE_SELECTED_CARDS_IN_DECK",
              data: {}
            }
          }
        }
      }
    }
  ]
};

export default cardActions;
