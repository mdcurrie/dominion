import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/dominion");

    // Connection opened
    socket.addEventListener("open", function(event) {
      socket.send("Hello Server!");
    });

    // Listen for messages
    socket.addEventListener("message", function(event) {
      console.log("Message from server ", event.data);
    });
  }, []);
  return <div>Welcome to Dominion</div>;
};

export default App;
