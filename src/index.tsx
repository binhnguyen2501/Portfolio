import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CustomCursorProvider from "./contexts/CustomCursorContext";
import CheckRouteWorkProvider from "./contexts/CheckRouteWorkContext";
import ThemeProvider from "./contexts/ThemeContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import "./index.css";

const theme = extendTheme({
  fonts: {
    body: "Nunito, sans-serif",
  },
});

ReactDOM.render(
  <ThemeProvider>
    <CustomCursorProvider>
      <CheckRouteWorkProvider>
        <BrowserRouter>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </CheckRouteWorkProvider>
    </CustomCursorProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
