import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Payable from "./pages/Payable";
// import WorkshopArea from "./pages/WorkshopArea";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Payable />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
