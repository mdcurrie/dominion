import React, { useEffect, useState } from "react";
import Game from "./Game";
import Waiting from "./Waiting";

const socket = {};

const AfterLogin = ({ username }) => {
  const [gameState, setGameState] = useState({
    status: "NOT_IN_PROGRESS",
    connections: []
  });
  useEffect(() => {
    socket.ws = new WebSocket(
      `ws://localhost:8080/dominion?username=${encodeURIComponent(username)}`
    );

    socket.ws.onmessage = function(event) {
      setGameState(JSON.parse(event.data));
    };
  }, []);

  if (gameState.status === "NOT_IN_PROGRESS") {
    return <Waiting connections={gameState.connections} ws={socket.ws} />;
  } else if (gameState.status === "IN_PROGRESS") {
    return <Game />;
  }
};

export default AfterLogin;
