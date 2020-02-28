import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Login = ({ setLoggedIn, setUsername, username }) => {
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

Login.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default Login;
