import React, { useState } from "react";
import AfterLogin from "./AfterLogin";
import BeforeLogin from "./BeforeLogin";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return loggedIn ? (
    <AfterLogin username={username} />
  ) : (
    <BeforeLogin
      username={username}
      setLoggedIn={setLoggedIn}
      setUsername={setUsername}
    />
  );
};

export default App;
