import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./fonts.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry only once
      retry: 1,
      // refetch on mount nobrainer
      refetchOnMount: true,
      // we don't need to refetch on window focus for now
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>,
);
