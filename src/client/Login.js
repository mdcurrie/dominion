import React from "react";

const Login = ({ playerName, setLoggedIn, setPlayerName }) => {
  return (
    <input
      type="text"
      value={playerName}
      onChange={e => setPlayerName(e.target.value)}
      onKeyPress={e => {
        if (e.key === "Enter") {
          setLoggedIn(true);
        }
      }}
    />
  );
};

export default Login;
