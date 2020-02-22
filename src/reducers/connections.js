const connections = (state = [], action) => {
  let connectionId, index;
  switch (action.type) {
    case "ADD_CONNECTION":
      return [...state, action.connection];
    case "REMOVE_CONNECTION":
      connectionId = action.connection.id;
      index = state.findIndex(x => x.id === connectionId);
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
