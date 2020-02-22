import path from "path";
import uuid from "uuid";
import express from "express";
import webpack from "webpack";
import expressWs from "express-ws";
import { createStore } from "redux";
import rootReducer from "../reducers";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.dev.config.js";

const store = createStore(rootReducer);
store.subscribe(() => console.log(store.getState()));

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "index.html"),
  compiler = webpack(config);

expressWs(app);
app.ws("/dominion", function(ws) {
  const connectionId = uuid.v4();
  store.dispatch({
    type: "ADD_CONNECTION",
    connection: { ws, id: connectionId }
  });

  ws.on("message", function(msg) {
    ws.send(msg);
  });

  ws.on("close", function() {
    store.dispatch({
      type: "REMOVE_CONNECTION",
      connection: { ws, id: connectionId }
    });
  });
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

app.get("/", (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}`);
});
