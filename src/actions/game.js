export function startGame(game) {
  return {
    type: "START_GAME",
    ...game
  };
}

export function endTurn({ id, logIds, nextId, nextUsername }) {
  return {
    type: "END_TURN",
    id,
    logIds,
    nextId,
    nextUsername
  };
}

export function buyCard({ cardName, id, location, logIds, username }) {
  return {
    type: "BUY_CARD",
    cardName,
    id,
    location,
    logIds,
    username
  };
}

export function playTreasure({ cardName, id, logIds, username }) {
  return {
    type: "PLAY_TREASURE",
    cardName,
    id,
    logIds,
    username
  };
}

export function gainActions({ actionAmount, id }) {
  return { type: "GAIN_ACTIONS", actionAmount, id };
}

export function playAction({ cardName, id, logIds, username }) {
  return {
    type: "PLAY_ACTION",
    cardName,
    id,
    logIds,
    username
  };
}

export function drawCards({ drawAmount, id }) {
  return {
    type: "DRAW_CARDS",
    drawAmount,
    id
  };
}

export function gainCards({ cardName, gainAmount, id, location }) {
  return {
    type: "GAIN_CARDS",
    cardName,
    gainAmount,
    id,
    location
  };
}

export function gainBuys({ buyAmount }) {
  return { type: "GAIN_BUYS", buyAmount };
}

export function sendMessage({ entry, logIds }) {
  return {
    type: "SEND_MESSAGE",
    entry,
    logIds
  };
}

export function gainFloatingGold({ floatingGoldAmount }) {
  return {
    type: "GAIN_FLOATING_GOLD",
    floatingGoldAmount
  };
}

export function blockAttack({ logIds, username }) {
  return {
    type: "BLOCK_ATTACK",
    logIds,
    username
  };
}

export function trashCards({ cardName, id, trashAmount }) {
  return {
    type: "TRASH_CARDS",
    cardName,
    id,
    trashAmount
  };
}

export function trashSelectedCards({
  cards,
  cardIndexes,
  id,
  logIds,
  username
}) {
  return {
    type: "TRASH_SELECTED_CARDS",
    cards,
    cardIndexes,
    id,
    logIds,
    username
  };
}

export function revealCards({ cards, logIds, username }) {
  return {
    type: "REVEAL_CARDS",
    cards,
    logIds,
    username
  };
}

export function placeInDeck({ cardIndex, cardName, id, logIds, username }) {
  return {
    type: "PLACE_IN_DECK",
    cardIndex,
    cardName,
    id,
    logIds,
    username
  };
}

export function placeSelectedCardsInDeck({
  cardIndexes,
  id,
  logIds,
  username
}) {
  return {
    type: "PLACE_SELECTED_CARDS_IN_DECK",
    cardIndexes,
    id,
    logIds,
    username
  };
}

export function choiceGainCards({
  cardType,
  gainAmount,
  id,
  location,
  maxCost,
  next
}) {
  return {
    type: "CHOICE_GAIN_CARDS",
    cardType,
    gainAmount,
    id,
    location,
    maxCost,
    next
  };
}

export function selectCardsInHand({
  cardType,
  id,
  logIds,
  maxSelectAmount,
  minSelectAmount,
  next
}) {
  return {
    type: "SELECT_CARDS_IN_HAND",
    cardType,
    id,
    logIds,
    maxSelectAmount,
    minSelectAmount,
    next
  };
}

export function selectOptions({ id, options, text }) {
  return { type: "SELECT_OPTIONS", id, options, text };
}

export function updateScore({ players }) {
  return {
    type: "UPDATE_SCORE",
    players
  };
}

export function completeChoiceGainCards({
  cardName,
  id,
  location,
  logIds,
  username
}) {
  return {
    type: "COMPLETE_CHOICE_GAIN_CARDS",
    cardName,
    id,
    location,
    logIds,
    username
  };
}

export function completeSelectCardsInHand() {
  return { type: "COMPLETE_SELECT_CARDS_IN_HAND" };
}

export function completeSelectOptions() {
  return { type: "COMPLETE_SELECT_OPTIONS" };
}

export function discardCards({ cards, cardIndexes, id, logIds, username }) {
  return { type: "DISCARD_CARDS", cards, cardIndexes, id, logIds, username };
}

export function trashCardsInLimbo({
  cards,
  cardIndexes,
  id,
  logIds,
  username
}) {
  return {
    type: "TRASH_CARDS_IN_LIMBO",
    cards,
    cardIndexes,
    id,
    logIds,
    username
  };
}

export function discardCardsInLimbo({
  cards,
  cardIndexes,
  id,
  logIds,
  username
}) {
  return {
    type: "DISCARD_CARDS_IN_LIMBO",
    cards,
    cardIndexes,
    id,
    logIds,
    username
  };
}

export function drawFromDiscard({ id }) {
  return { type: "DRAW_FROM_DISCARD", id };
}

export function moveFromDiscardToDeck({ cardName, logIds, id, username }) {
  return { type: "MOVE_FROM_DISCARD_TO_DECK", cardName, logIds, id, username };
}

export function moveFromDeckToLimbo({ drawAmount, id }) {
  return { type: "MOVE_FROM_DECK_TO_LIMBO", drawAmount, id };
}

export function moveFromLimboToDeck({ cardIndexes, id }) {
  return { type: "MOVE_FROM_LIMBO_TO_DECK", cardIndexes, id };
}

export function playerDisconnect({ logIds, username }) {
  return { type: "PLAYER_DISCONNECT", logIds, username };
}

export function addSpectator({ logIds, username }) {
  return {
    type: "ADD_SPECTATOR",
    logIds,
    username
  };
}
