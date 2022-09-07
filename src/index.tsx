import React from "react";
import ReactDOM from "react-dom/client";
import { getDefaultProvider } from "ethers";
import { App } from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
