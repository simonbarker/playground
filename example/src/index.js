import React from "react";
import { render } from "react-dom";
import "babel-polyfill";
import "@reach/tabs/styles.css";
import Playground from "@agney/playground";

const App = () => {
  const snippet = {
    javascript: `console.log('Hello');`,
  };
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Playground
        initialSnippet={snippet}
        defaultEditorTab="javascript"
        defaultResultTab="console"
        mode="ATCDark"
        transformJs
      />
    </div>
  );
};

const rootEl = document.getElementById("root");
render(<App />, rootEl);
