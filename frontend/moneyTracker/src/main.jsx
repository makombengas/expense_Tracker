import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./Store/Store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { UserContextProvider } from "./Hooks/UseUser";
import { MsgProvider } from "./Hooks/useMessages";
const baseURI = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURI;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MsgProvider>
      <UserContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserContextProvider>
    </MsgProvider>
  </BrowserRouter>
);
