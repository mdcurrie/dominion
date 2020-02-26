const connections = (state = [], action) => {
  let index = -1;
  switch (action.type) {
    case "ADD_CONNECTION":
      if (state.length >= 4) {
        return state;
      } else {
        return [...state, action.connection];
      }
    case "REMOVE_CONNECTION":
      index = state.findIndex(x => x.id === action.connectionId);
      if (index === -1) {
        return state;
      } else {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    default:
      return state;
  }
};

export default connections;
