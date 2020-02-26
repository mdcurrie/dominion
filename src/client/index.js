import React, { useState } from "react";
import ReactDOM from "react-dom";
import LoggedIn from "./LoggedIn";
import Login from "./Login";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return loggedIn ? (
    <LoggedIn username={username} />
  ) : (
    <Login
      username={username}
      setLoggedIn={setLoggedIn}
      setUsername={setUsername}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
