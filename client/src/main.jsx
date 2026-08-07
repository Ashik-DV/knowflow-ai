import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AuthProvider>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "16px",
            background: "#0F172A",
            color: "#F8FAFC",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "12px 16px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#10B981", secondary: "#F8FAFC" },
          },
          error: {
            iconTheme: { primary: "#EF4444", secondary: "#F8FAFC" },
          },
        }}
      />

      <App />

    </AuthProvider>

  </React.StrictMode>
);