import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Import fonts
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/funnel-display/300.css";
import "@fontsource/funnel-display/400.css";
import "@fontsource/funnel-display/500.css";
import "@fontsource/funnel-display/700.css";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
