import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import App from "./App";

import {
  ToastProvider,
  AuthProvider,
  VideosProvider,
  DataProvider,
} from "./contexts";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

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
