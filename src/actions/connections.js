export function addConnection(connection) {
  return {
    type: "ADD_CONNECTION",
    connection
  };
}

export function removeConnection(connectionId) {
  return {
    type: "REMOVE_CONNECTION",
    connectionId
  };
}

export function asyncAddConnection({ id, username, ws }) {
  return { type: "ASYNC_ADD_CONNECTION", id, username, ws };
}

export function asyncRemoveConnection(connectionId) {
  return {
    type: "ASYNC_REMOVE_CONNECTION",
    connectionId
  };
}
