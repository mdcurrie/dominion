import React, { useState } from "react";
import Game from "./Game";
import Login from "./Login";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState("");

  return loggedIn ? (
    <Game playerName={playerName} />
  ) : (
    <Login
      playerName={playerName}
      setLoggedIn={setLoggedIn}
      setPlayerName={setPlayerName}
    />
  );
};

export default App;
