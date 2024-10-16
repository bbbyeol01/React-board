// src/router.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/about"
        element={
          <main>
            <div className="titleContainer">
              <div className="title">About page</div>
            </div>
          </main>
        }
      />
    </Routes>
  );
}

export default AppRouter;
