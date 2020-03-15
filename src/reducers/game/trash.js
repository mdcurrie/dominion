const trash = (state = [], action) => {
  switch (action.type) {
    case "START_GAME":
      return action.trash;
    case "TRASH_CARDS":
      return [...state, ...Array(action.trashAmount).fill(action.cardName)];
    case "TRASH_SELECTED_CARDS":
      return [...state, ...action.cards];
    default:
      return state;
  }
};

export default trash;
