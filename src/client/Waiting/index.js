import React from "react";
import styles from "./styles.css";

const Waiting = ({ connections, ws }) => (
  <div className="waiting">
    <div className="waitingSpinner">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="waitingHeader">Waiting for players...</div>
    <div>
      {connections.map(c => (
        <div className="waitingPlayerUsername">{c}</div>
      ))}
    </div>
    <button
      className="waitingButton"
      onClick={() => ws.send(JSON.stringify({ type: "START_GAME" }))}
    >
      Play Now!
    </button>
  </div>
);

export default Waiting;
