export function addConnection({ ws, id, username }) {
  return {
    type: "ADD_CONNECTION",
    connection: { ws, id, username }
  };
}

export function removeConnection({ ws, id, username }) {
  return {
    type: "REMOVE_CONNECTION",
    connection: { ws, id, username }
  };
}

export function asyncAddConnection({ ws, id, username }) {
  return {
    type: "ASYNC_ADD_CONNECTION",
    connection: { ws, id, username }
  };
}

export function asyncRemoveConnection({ ws, id, username }) {
  return {
    type: "ASYNC_REMOVE_CONNECTION",
    connection: { ws, id, username }
  };
}
