import { put, takeEvery, select } from "redux-saga/effects";
import {
  trashSelectedCards,
  drawCards,
  gainActions,
  gainBuys,
  gainFloatingGold,
  selectCardsInHand,
  selectOptions,
  playAction,
  logMessage
} from "../../../actions";
import { gamePlayerIdsSelector, gamePlayerSelector } from "../../../selectors";
import { FLAVOR_IMAGES } from "../../../utils/constants";

export function* asyncPlaySpiceMerchant() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    playAction({
      cardName: "Spice Merchant",
      id: player.id,
      logIds: playerIds,
      username: player.username
    })
  );
  yield put(
    selectCardsInHand({
      cardType: "TREASURE",
      id: player.id,
      logIds: player.id,
      minSelectAmount: 0,
      maxSelectAmount: 1,
      next: { type: "ASYNC_PLAY_SPICE_MERCHANT_TRASH" }
    })
  );
}

export function* asyncPlaySpiceMerchantTrash({ cards, cardIndexes }) {
  let player = yield select(gamePlayerSelector);
  player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  if (cards.length > 0) {
    yield put(
      trashSelectedCards({
        cards,
        cardIndexes,
        id: player.id,
        logIds: playerIds,
        username: player.username
      })
    );

    const options = [
      {
        next: { type: "ASYNC_PLAY_SPICE_MERCHANT_ADD_BUY_AND_GOLD" },
        text: "+1 Buy +2 Gold"
      },
      {
        next: { type: "ASYNC_PLAY_SPICE_MERCHANT_DRAW_CARDS_AND_ACTION" },
        text: "+2 Cards +1 Action"
      }
    ];

    yield put(
      selectOptions({
        id: player.id,
        options,
        text: "Choose One:",
        flavorImage: FLAVOR_IMAGES.PoutineCat
      })
    );
  }
}

export function* asyncPlaySpiceMerchantAddBuyAndGold() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    logMessage({
      logIds: playerIds,
      message: `${player.username} selected +1 Buy +2 Gold`
    })
  );
  yield put(gainBuys({ buyAmount: 1, id: player.id }));
  yield put(gainFloatingGold({ floatingGoldAmount: 2 }));
}

export function* asyncPlaySpiceMerchantDrawCardsAndAction() {
  const player = yield select(gamePlayerSelector);
  const playerIds = yield select(gamePlayerIdsSelector);

  yield put(
    logMessage({
      logIds: playerIds,
      message: `${player.username} selected +2 Cards +1 Action`
    })
  );
  yield put(drawCards({ drawAmount: 2, id: player.id }));
  yield put(gainActions({ actionAmount: 1, id: player.id }));
}

const spiceMerchantSagas = [
  takeEvery("ASYNC_PLAY_SPICE_MERCHANT", asyncPlaySpiceMerchant),
  takeEvery("ASYNC_PLAY_SPICE_MERCHANT_TRASH", asyncPlaySpiceMerchantTrash),
  takeEvery(
    "ASYNC_PLAY_SPICE_MERCHANT_ADD_BUY_AND_GOLD",
    asyncPlaySpiceMerchantAddBuyAndGold
  ),
  takeEvery(
    "ASYNC_PLAY_SPICE_MERCHANT_DRAW_CARDS_AND_ACTION",
    asyncPlaySpiceMerchantDrawCardsAndAction
  )
];

export default spiceMerchantSagas;
