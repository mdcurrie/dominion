import path from "path";
import express from "express";
import webpack from "webpack";
//import expressWs from "express-ws";
import { createStore } from "redux";
import rootReducer from "../reducers";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.dev.config.js";

const store = createStore(rootReducer);

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "index.html"),
  compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

app.get("*", (req, res, next) => {
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
// const ws = expressWs(app);
// app.ws("/echo", function(ws, req) {
//   ws.on("message", function(msg) {
//     ws.send(msg);
//   });
// });
