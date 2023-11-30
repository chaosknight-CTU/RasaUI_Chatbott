// src/App.js
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatContainer from "./pages/ChatContainer";
import Login from "./components/Login";
import Register from "./components/Register";

// Import the functions you need from the SDKs you need

const App = () => {
  return (
    <Router>
      <div className="site-layout-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatContainer />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
