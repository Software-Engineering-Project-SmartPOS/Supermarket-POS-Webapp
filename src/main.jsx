import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./state/store.js";
import client from "./ApolloClient.js";
import { ApolloProvider } from "@apollo/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
