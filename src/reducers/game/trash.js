const trash = (state = [], action) => {
  switch (action.type) {
    case "START_GAME":
      return action.trash;
    case "ADD_TO_TRASH":
      return [...state, action.card];
    default:
      return state;
  }
};

export default trash;
