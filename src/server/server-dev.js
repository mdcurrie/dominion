import path from "path";
import uuid from "uuid";
import express from "express";
import webpack from "webpack";
import expressWs from "express-ws";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
import config from "../../webpack.dev.config.js";
import { asyncAddConnection, asyncRemoveConnection } from "../actions";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "index.html"),
  compiler = webpack(config);

expressWs(app);
app.ws("/dominion", function(ws, req) {
  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    ws.send(
      JSON.stringify({
        status: state.status,
        connections: state.connections.map(c => c.username),
        game: state.game,
      })
    );
  });

  const id = uuid.v4();
  const url = new URL(req.url, `ws://${req.headers.host}`);
  const username = url.searchParams.get("username");
  store.dispatch(asyncAddConnection({ ws, id, username }));

  ws.on("message", function(msg) {
    store.dispatch(JSON.parse(msg));
  });

  ws.on("close", function() {
    unsubscribe();
    store.dispatch(asyncRemoveConnection({ ws, id, username }));
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
