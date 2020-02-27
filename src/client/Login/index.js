import React from "react";
import styles from "./styles.css";

const Login = ({ username, setLoggedIn, setUsername }) => {
  return (
    <div className="login">
      <div className="loginHeader">Welcome to Dominion</div>
      <input
        autoComplete="off"
        autoFocus={true}
        className="loginInput"
        onChange={event => setUsername(event.target.value)}
        onKeyPress={event => {
          if (event.key === "Enter") {
            setLoggedIn(true);
          }
        }}
        placeholder="Enter a username"
        type="text"
        value={username}
      />
      <button className="loginButton" onClick={() => setLoggedIn(true)}>
        Connect!
      </button>
    </div>
  );
};

export default Login;
