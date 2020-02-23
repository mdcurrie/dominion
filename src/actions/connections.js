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

export function sagaAddConnection({ ws, id, username }) {
  return {
    type: "SAGA/ADD_CONNECTION",
    connection: { ws, id, username }
  };
}

export function sagaRemoveConnection({ ws, id, username }) {
  return {
    type: "SAGA/REMOVE_CONNECTION",
    connection: { ws, id, username }
  };
}
