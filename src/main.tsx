import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./utils/Theme/ThemeProvider.tsx";
import WalletContextProvider from "./utils/WalletContext/WalletContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <WalletContextProvider>
          <App />
        </WalletContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
