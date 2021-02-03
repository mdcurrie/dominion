import isEmpty from "lodash/isEmpty";
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
  const connectionId = uuid.v4();
  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    ws.send(
      JSON.stringify({
        game: state.game,
        id: connectionId,
        usernames: state.connections.map(c => c.username),
        selectedCards: state.cardSelection,
        status: state.status
      })
    );
  });

  const url = new URL(req.url, `ws://${req.headers.host}`);
  const username = url.searchParams.get("username");
  store.dispatch(asyncAddConnection({ ws, id: connectionId, username }));

  ws.on("message", function(msg) {
    const msgObj = JSON.parse(msg);
    if (isEmptyObject(msgObj)) {
      return;
    }
    store.dispatch({ ...msgObj, id: connectionId });
  });

  ws.on("close", function() {
    unsubscribe();
    store.dispatch(asyncRemoveConnection(connectionId));
  });
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
app.use(express.static("./public"));
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}`);
});
