import snakeCase from "lodash/snakeCase";
import { put, takeEvery, select } from "redux-saga/effects";
import {
  connectionsSelector,
  currentPlayerIdSelector,
  currentPlayerSelector,
  gameIsOverSelector,
  gameSupplyCardCountSelector,
  gameNextPlayerSelector,
  gamePlayerFromIdSelector,
  gamePlayerIdsSelector,
  gamePlayerRequestSelector,
  gamePlayerSelector,
  gamePlayersSelector,
  numberOfConnectionsSelector,
  cardSelectionSelector,
  statusSelector
} from "../selectors";
import {
  addConnection,
  addSpectator,
  buyCard,
  completeChoiceGainCards,
  completeSelectCardsInHand,
  completeSelectOptions,
  discardCards,
  endTurn,
  gainCards,
  playerDisconnect,
  removeConnection,
  resetCardSelection,
  sendMessage,
  sendImageUrl,
  startGame,
  updateScore,
  updateStatus
} from "../actions";
import {
  ACTION_CARDS,
  CARD_COSTS,
  TREASURE_CARDS,
  VICTORY_AND_CURSE_CARDS
} from "../utils/constants";
import gameRandomizer from "../utils/randomizer";

export function* asyncStartCardSelection() {
  const connections = yield select(connectionsSelector);
  if (connections.length >= 2 && connections.length <= 4) {
    yield put(resetCardSelection());
    yield put(updateStatus("CARD_SELECTION"));
  }
}

export function* asyncStartGame() {
  const connections = yield select(connectionsSelector);
  const selectedCards = yield select(cardSelectionSelector);
  yield put(startGame(gameRandomizer({ connections, selectedCards })));
}

export function* asyncAddConnection({ id, username, ws }) {
  yield put(addConnection({ id, username, ws }));

  const status = yield select(statusSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  if (status === "IN_PROGRESS") {
    yield put(addSpectator({ logIds: playerIds, username }));
  }
}

export function* asyncRemoveConnection({ connectionId }) {
  yield put(removeConnection(connectionId));
  const numberOfConnections = yield select(numberOfConnectionsSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  const status = yield select(statusSelector);
  if (numberOfConnections === 0 || status === "CARD_SELECTION") {
    yield put(updateStatus("NOT_IN_PROGRESS"));
    return;
  }

  if (status === "IN_PROGRESS" && playerIds.includes(connectionId)) {
    const player = yield select(gamePlayerFromIdSelector, connectionId);
    const players = yield select(gamePlayersSelector);
    yield put(
      playerDisconnect({
        logIds: playerIds,
        username: player.username
      })
    );
    yield put(updateScore({ players }));
  }
}

export function* asyncBuyCard({ id, name: cardName }) {
  let currentPlayer = yield select(currentPlayerSelector);
  const cardCount = yield select(gameSupplyCardCountSelector, cardName);
  const playerRequest = yield select(gamePlayerRequestSelector);
  if (
    currentPlayer.id !== id ||
    currentPlayer.buys <= 0 ||
    cardCount <= 0 ||
    currentPlayer.gold < CARD_COSTS[cardName] ||
    playerRequest
  ) {
    return;
  }

  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  yield put(
    buyCard({
      cardName,
      id,
      location: "DISCARD",
      logIds: playerIds,
      username: player.username
    })
  );

  currentPlayer = yield select(currentPlayerSelector);
  if (currentPlayer.buys === 0) {
    yield asyncEndTurn({ id });
  }
}

export function* asyncEndTurn({ id }) {
  const currentPlayerId = yield select(currentPlayerIdSelector);
  if (currentPlayerId !== id) {
    return;
  }

  if (yield select(gameIsOverSelector)) {
    yield put(updateScore({ players: yield select(gamePlayersSelector) }));
    return;
  }

  const nextPlayer = yield select(gameNextPlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  yield put(
    endTurn({
      id,
      logIds: playerIds,
      nextId: nextPlayer.id,
      nextUsername: nextPlayer.username
    })
  );
}

export function* asyncPlayCard({ id, cardName, cardIndex }) {
  const currentPlayer = yield select(currentPlayerSelector);
  const player = yield select(gamePlayerSelector);
  const playerRequest = yield select(gamePlayerRequestSelector);
  if (
    player.id !== id ||
    playerRequest ||
    (VICTORY_AND_CURSE_CARDS.includes(cardName) &&
      !ACTION_CARDS.includes(cardName))
  ) {
    return;
  }

  if (
    ACTION_CARDS.includes(cardName) &&
    (currentPlayer.actions <= 0 ||
      TREASURE_CARDS.some(c => player.cards.inplay.includes(c)))
  ) {
    return;
  }

  yield put({
    type: `ASYNC_PLAY_${snakeCase(cardName).toUpperCase()}`,
    cardIndex
  });
}

export function* asyncPlayAllTreasures({ id }) {
  const currentPlayerId = yield select(currentPlayerIdSelector);
  const playerRequest = yield select(gamePlayerRequestSelector);
  const player = yield select(gamePlayerSelector);
  if (currentPlayerId !== id || playerRequest) {
    return;
  }

  const goldCount = player.cards.hand.filter(card => card === "Gold").length;
  const silverCount = player.cards.hand.filter(card => card === "Silver")
    .length;
  const copperCount = player.cards.hand.filter(card => card === "Copper")
    .length;
  // Don't need card indexes here since all available treasures will be played.
  for (let i = 0; i < goldCount; i++) {
    yield put({ type: "ASYNC_PLAY_GOLD" });
  }
  for (let i = 0; i < silverCount; i++) {
    yield put({ type: "ASYNC_PLAY_SILVER" });
  }
  for (let i = 0; i < copperCount; i++) {
    yield put({ type: "ASYNC_PLAY_COPPER" });
  }
}

export function* asyncGainCards({ cardName, gainAmount, id, location }) {
  const cardCount = yield select(gameSupplyCardCountSelector, cardName);
  yield put(
    gainCards({
      cardName,
      gainAmount: Math.min(gainAmount, cardCount),
      id,
      location
    })
  );
}

export function* asyncCompleteChoiceGainCards({ id, name: cardName }) {
  const cardCount = yield select(gameSupplyCardCountSelector, cardName);
  const playerRequest = yield select(gamePlayerRequestSelector);
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  if (
    cardCount <= 0 ||
    playerRequest == null ||
    playerRequest.id !== id ||
    playerRequest.type !== "CHOICE_GAIN_CARDS" ||
    playerRequest.gainAmount <= 0 ||
    playerRequest.maxCost < CARD_COSTS[cardName] ||
    (playerRequest.cardType === "TREASURE" &&
      !TREASURE_CARDS.includes(cardName))
  ) {
    return;
  }

  yield put(
    completeChoiceGainCards({
      cardName,
      id,
      location: playerRequest.location,
      logIds: playerIds,
      username: player.username
    })
  );
  if (playerRequest.next) {
    yield put(playerRequest.next);
  }
}

export function* asyncSendMessage({ entry }) {
  const playerIds = yield select(gamePlayerIdsSelector);
  yield put(sendMessage({ entry, logIds: playerIds }));
}

export function* asyncSendImageUrl({ username, url }) {
  const playerIds = yield select(gamePlayerIdsSelector);
  yield put(sendImageUrl({ logIds: playerIds, username, url }));
}

export function* asyncCompleteSelectCardsInHand({ id, cardIndexes }) {
  const player = yield select(gamePlayerFromIdSelector, id);
  const playerRequest = yield select(gamePlayerRequestSelector);
  const cards = player.cards.hand.filter((cardName, index) =>
    cardIndexes.includes(index)
  );
  if (
    playerRequest == null ||
    playerRequest.id !== id ||
    playerRequest.type !== "SELECT_CARDS_IN_HAND" ||
    cardIndexes.length < playerRequest.minSelectAmount ||
    (playerRequest.maxSelectAmount != null &&
      cardIndexes.length > playerRequest.maxSelectAmount) ||
    (playerRequest.cardType === "TREASURE" &&
      !TREASURE_CARDS.includes(cards[0]) &&
      cardIndexes.length !== 0)
  ) {
    return;
  }

  yield put(completeSelectCardsInHand());
  if (playerRequest.next) {
    yield put({ ...playerRequest.next, cards, cardIndexes, id });
  }
}

export function* asyncCompleteSelectOption({ id, next }) {
  const playerRequest = yield select(gamePlayerRequestSelector);
  if (
    playerRequest == null ||
    playerRequest.id !== id ||
    playerRequest.type !== "SELECT_OPTIONS"
  ) {
    return;
  }

  yield put(completeSelectOptions());
  if (next) {
    yield put({ ...next });
  }
}

export function* asyncDiscardSelectedCards({ cardIndexes, id, onDiscard }) {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);
  const cards = player.cards.hand.filter((cardName, index) =>
    cardIndexes.includes(index)
  );

  yield put(
    discardCards({
      cards,
      cardIndexes,
      id,
      logIds: playerIds,
      username: player.username
    })
  );

  if (onDiscard) {
    const { type, data } = onDiscard;
    yield put({ type, drawAmount: cardIndexes.length, id, ...data });
  }
}

const gameSagas = [
  takeEvery("ASYNC_START_CARD_SELECTION", asyncStartCardSelection),
  takeEvery("ASYNC_START_GAME", asyncStartGame),
  takeEvery("ASYNC_ADD_CONNECTION", asyncAddConnection),
  takeEvery("ASYNC_REMOVE_CONNECTION", asyncRemoveConnection),
  takeEvery("ASYNC_BUY_CARD", asyncBuyCard),
  takeEvery("ASYNC_GAIN_CARDS", asyncGainCards),
  takeEvery("ASYNC_END_TURN", asyncEndTurn),
  takeEvery("ASYNC_PLAY_CARD", asyncPlayCard),
  takeEvery("ASYNC_PLAY_ALL_TREASURES", asyncPlayAllTreasures),
  takeEvery("ASYNC_COMPLETE_CHOICE_GAIN_CARDS", asyncCompleteChoiceGainCards),
  takeEvery("ASYNC_SEND_MESSAGE", asyncSendMessage),
  takeEvery("ASYNC_SEND_IMAGE_URL", asyncSendImageUrl),
  takeEvery(
    "ASYNC_COMPLETE_SELECT_CARDS_IN_HAND",
    asyncCompleteSelectCardsInHand
  ),
  takeEvery("ASYNC_COMPLETE_SELECT_OPTIONS", asyncCompleteSelectOption),
  takeEvery("ASYNC_DISCARD_SELECTED_CARDS", asyncDiscardSelectedCards)
];

export default gameSagas;
