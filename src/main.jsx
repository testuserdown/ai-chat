import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./home/app";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/layout";
import "./index.css";
import GeminiChat from "./components/chat/chat";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/chat/:ai_id" element={<GeminiChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

