import path from "path";
import uuid from "uuid";
import express from "express";
import expressWs from "express-ws";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
import { asyncAddConnection, asyncRemoveConnection } from "../actions";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "index.html");

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
    store.dispatch({ ...JSON.parse(msg), id: connectionId });
  });

  ws.on("close", function() {
    unsubscribe();
    store.dispatch(asyncRemoveConnection(connectionId));
  });
});

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.set("content-type", "text/html");
  res.send(HTML_FILE);
  res.end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}`);
});
