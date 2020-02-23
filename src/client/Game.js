import React, { useEffect, useState } from "react";
import Waiting from "./Waiting";

const Game = ({ username }) => {
  const [gameState, setGameState] = useState({
    status: "NOT_IN_PROGRESS",
    connections: []
  });
  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8080/dominion?username=${encodeURIComponent(username)}`
    );
    socket.onmessage = function(event) {
      setGameState(JSON.parse(event.data));
    };
  }, []);

  if (gameState.status === "NOT_IN_PROGRESS") {
    return <Waiting connections={gameState.connections} />;
  } else {
    return <div>Hello dominion</div>;
  }
};

export default Game;
