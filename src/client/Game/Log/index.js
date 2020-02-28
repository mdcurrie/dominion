import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Log = ({ log }) => (
  <div className="gameLog">
    {log.map((entry, index) => (
      <div key={index} className="gameLogMessage">
        {entry}
      </div>
    ))}
  </div>
);

Log.propTypes = {
  log: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Log;
