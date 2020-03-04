const score = (state = null, action) => {
  switch (action.type) {
    case "START_GAME":
      return action.score;
    case "UPDATE_SCORE":
      return action.players.map(player => {
        const allPlayerCards = [
          ...player.cards.hand,
          ...player.cards.deck,
          ...player.cards.discard,
          ...player.cards.inplay
        ];

        const estateCount = allPlayerCards.filter(card => card === "Estate")
          .length;
        const duchyCount = allPlayerCards.filter(card => card === "Duchy")
          .length;
        const provinceCount = allPlayerCards.filter(card => card === "Province")
          .length;
        const gardensCount = allPlayerCards.filter(card => card === "Gardens")
          .length;
        return {
          estateCount,
          duchyCount,
          provinceCount,
          gardensCount,
          cardCount: allPlayerCards.length,
          finalScore:
            estateCount * 1 +
            duchyCount * 3 +
            provinceCount * 6 +
            gardensCount * Math.floor(allPlayerCards.length / 10)
        };
      });
    default:
      return state;
  }
};

export default score;
