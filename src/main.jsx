import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/toaster.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <App />
  </StrictMode>
);
