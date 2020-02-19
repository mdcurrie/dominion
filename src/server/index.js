const express = require("express");
//const expressWs = require("express-ws");

const app = express();
//const ws = expressWs(app);

// app.ws("/echo", function(ws, req) {
//   ws.on("message", function(msg) {
//     ws.send(msg);
//   });
// });

app.use(express.static("dist"));
app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
