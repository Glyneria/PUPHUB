import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth"; // adjust if in another folder

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ MUST WRAP App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);