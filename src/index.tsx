import * as React from "react";
import { render } from "react-dom";
import ChartsContainer from "./container/charts";

// https://github.com/webpack/webpack/tree/master/examples/code-splitting-specify-chunk-name
// https://medium.com/front-end-weekly/webpack-and-dynamic-imports-doing-it-right-72549ff49234

import "./styles.css";

import "./test-ab/config.js";

function App() {
  return <ChartsContainer />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
