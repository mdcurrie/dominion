const status = (state = "NOT_IN_PROGRESS", action) => {
  switch (action.type) {
    case "UPDATE_STATUS":
      return action.status;
    default:
      return state;
  }
};

export default status;
