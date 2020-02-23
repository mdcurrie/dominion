import React, { useEffect, useState } from "react";

const Game = ({ playerName }) => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/dominion");
    socket.addEventListener("open", function(event) {
      socket.send("Hello Server!");
    });
    // Listen for messages
    socket.addEventListener("message", function(event) {
      console.log("Message from server ", event.data);
    });
  }, []);
  return <div>Hello dominion</div>;
};

export default Game;
