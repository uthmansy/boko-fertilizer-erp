import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { IconContext } from "react-icons";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Disable auto refetching globally
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <IconContext.Provider value={{ className: "w-7 h-auto text-gray-500" }}>
          <App />
        </IconContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
