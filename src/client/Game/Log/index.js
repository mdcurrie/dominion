import React from "react";
import "./styles.css";

const Log = ({ log }) => (
  <div className="gameLog">
    {log.map(l => (
      <div className="gameLogMessage">{l}</div>
    ))}
  </div>
);

export default Log;
