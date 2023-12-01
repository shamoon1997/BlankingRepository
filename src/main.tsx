import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./fonts.css";
import "./index.css";
import { FallBackPage } from "./pages/fall-back-page.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Auth0ProviderWithNavigate } from "./state/providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={FallBackPage}>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
