import sample from "lodash/sample";
import shuffle from "lodash/shuffle";
import kingdomCards from "./kingdomCards";

function createTreasures(numberOfPlayers) {
  const PLAYER_COUNT_TO_COPPER_COUNT = { 2: 46, 3: 39, 4: 32 };
  let copperCount = PLAYER_COUNT_TO_COPPER_COUNT[numberOfPlayers];
  if (copperCount == null) {
    copperCount = 46;
  }

  return [
    {
      name: "Copper",
      count: copperCount
    },
    {
      name: "Silver",
      count: 40
    },
    {
      name: "Gold",
      count: 30
    }
  ];
}

function createVictories(numberOfPlayers) {
  const PLAYER_COUNT_TO_VICTORY_COUNT = { 2: 8, 3: 12, 4: 12 };
  let victoryCount = PLAYER_COUNT_TO_VICTORY_COUNT[numberOfPlayers];
  if (victoryCount == null) {
    victoryCount = 8;
  }

  return [
    {
      name: "Estate",
      count: victoryCount
    },
    {
      name: "Duchy",
      count: victoryCount
    },
    {
      name: "Province",
      count: victoryCount
    }
  ];
}

function createKingdoms(numberOfPlayers) {
  const PLAYER_COUNT_TO_VICTORY_COUNT = { 2: 8, 3: 12, 4: 12 };
  let victoryCount = PLAYER_COUNT_TO_VICTORY_COUNT[numberOfPlayers];
  if (victoryCount == null) {
    victoryCount = 8;
  }

  const kingdomCardNames = shuffle(kingdomCards).slice(0, 10);
  return kingdomCardNames.map(function(name) {
    if (name == "Gardens") {
      return { name, count: victoryCount };
    } else {
      return { name, count: 10 };
    }
  });
}

function createCurses(numberOfPlayers) {
  const PLAYER_COUNT_TO_CURSE_COUNT = { 2: 10, 3: 20, 4: 30 };
  let curseCount = PLAYER_COUNT_TO_CURSE_COUNT[numberOfPlayers];
  if (curseCount == null) {
    curseCount = 10;
  }

  return [{ name: "Curse", count: curseCount }];
}

function supplyRandomizer(numberOfPlayers) {
  return [
    ...createTreasures(numberOfPlayers),
    ...createVictories(numberOfPlayers),
    ...createKingdoms(numberOfPlayers),
    ...createCurses(numberOfPlayers)
  ];
}

function createPlayers(connections) {
  return connections.map(c => ({
    id: c.id,
    username: c.username,
    cards: {
      hand: [],
      discard: [],
      inplay: [],
      deck: shuffle([...Array(3).fill("Estate"), ...Array(7).fill("Copper")])
    }
  }));
}

export default function gameRandomizer({ connections }) {
  const numberOfPlayers = connections.length;
  return {
    supply: supplyRandomizer(numberOfPlayers),
    trash: [],
    players: createPlayers(connections),
    currentPlayer: {
      id: sample(connections.map(c => c.id)),
      actions: 0,
      buys: 0,
      gold: 0
    }
  };
}
