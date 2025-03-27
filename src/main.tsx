import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./styles/global.css";

import App from "./App";

// import App from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
