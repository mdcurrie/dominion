import React, { useState } from "react";
import Game from "./Game";
import Login from "./Login";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return loggedIn ? (
    <Game username={username} />
  ) : (
    <Login
      username={username}
      setLoggedIn={setLoggedIn}
      setUsername={setUsername}
    />
  );
};

export default App;
