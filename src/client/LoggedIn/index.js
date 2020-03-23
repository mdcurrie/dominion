import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Game from "../Game";
import Waiting from "../Waiting";

const socket = {};

const LoggedIn = ({ username }) => {
  const [gameState, setGameState] = useState({
    status: "NOT_IN_PROGRESS",
    usernames: [],
    game: {
      supply: [],
      trash: [],
      players: [],
      currentPlayer: {
        id: null,
        actions: 0,
        buys: 0,
        gold: 0
      },
      log: [],
      score: null,
      playerRequest: null
    },
    id: null
  });
  const logEndRef = useRef(null);
  useEffect(() => {
    const url =
      process.env.NODE_ENV === "development"
        ? "ws://localhost:8080/dominion"
        : "ws://marcusdominion2.herokuapp.com/dominion";
    socket.ws = new WebSocket(
      `${url}?username=${encodeURIComponent(username)}`
    );

    socket.ws.onmessage = function(event) {
      setGameState(JSON.parse(event.data));
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
  }, []);

  if (gameState.status === "NOT_IN_PROGRESS") {
    return <Waiting usernames={gameState.usernames} socket={socket.ws} />;
  } else if (gameState.status === "IN_PROGRESS") {
    return (
      <Game
        game={gameState.game}
        playerId={gameState.id}
        logEndRef={logEndRef}
        socket={socket.ws}
        username={username}
      />
    );
  }
};

LoggedIn.propTypes = {
  username: PropTypes.string.isRequired
};

export default LoggedIn;
