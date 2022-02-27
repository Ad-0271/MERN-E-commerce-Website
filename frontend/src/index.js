import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { ChakraProvider } from "@chakra-ui/react";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplates from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ReduxProvider store={store}>
        <AlertProvider template={AlertTemplates} {...options}>
          <App />
        </AlertProvider>
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
