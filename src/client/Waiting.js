import React from "react";

const Waiting = ({ connections }) => (
  <div>
    <div>Waiting for players...</div>
    <div>
      {connections.map(c => (
        <div>{c}</div>
      ))}
    </div>
  </div>
);

export default Waiting;
