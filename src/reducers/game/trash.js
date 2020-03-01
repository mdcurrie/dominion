const trash = (state = [], action) => {
  switch (action.type) {
    case "START_GAME":
      return action.trash;
    case "TRASH_CARDS":
      return [...state, ...Array(action.trashAmount).fill(action.cardName)];
    default:
      return state;
  }
};

export default trash;
