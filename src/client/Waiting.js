import React from "react";

const Waiting = ({ connections, ws }) => (
  <div>
    <div>Waiting for players...</div>
    <div>
      {connections.map(c => (
        <div>{c}</div>
      ))}
    </div>
    <button
      onClick={() =>
        ws.send(
          JSON.stringify({ type: "UPDATE_STATUS", status: "IN_PROGRESS" })
        )
      }
    >
      Play Now!
    </button>
  </div>
);

export default Waiting;