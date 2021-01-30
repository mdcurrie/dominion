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
        const curseCount = allPlayerCards.filter(card => card === "Curse")
          .length;
        const noblesCount = allPlayerCards.filter(card => card === "Nobles")
          .length;
        return {
          username: player.username,
          estateCount,
          duchyCount,
          provinceCount,
          gardensCount,
          curseCount,
          noblesCount,
          cardCount: allPlayerCards.length,
          finalScore:
            estateCount +
            duchyCount * 3 +
            provinceCount * 6 +
            noblesCount * 2 +
            gardensCount * Math.floor(allPlayerCards.length / 10) -
            curseCount
        };
      });
    default:
      return state;
  }
};

export default score;
