import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CmsProvider } from "./data/cms.jsx";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/500-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./index.css";

// Matches vite.config.js "base"
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      basename={basename}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <CmsProvider>
        <App />
      </CmsProvider>
    </BrowserRouter>
  </React.StrictMode>
);