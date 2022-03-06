import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CustomCursorProvider from "./contexts/CustomCursorContext";
import CheckRouteWorkProvider from "./contexts/CheckRouteWorkContext";
import ThemeProvider from "./contexts/ThemeContext";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <ThemeProvider>
    <CustomCursorProvider>
      <CheckRouteWorkProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CheckRouteWorkProvider>
    </CustomCursorProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
