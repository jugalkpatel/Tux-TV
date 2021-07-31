import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import {
  ToastProvider,
  AuthProvider,
  VideosProvider,
  DataProvider,
} from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <VideosProvider>
          <AuthProvider>
            <DataProvider>
              <App />
            </DataProvider>
          </AuthProvider>
        </VideosProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
