// src/router.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Board from "./components/board/Board";
import Write from "./components/board/Write";
import Post from "./components/board/Read";
import Edit from "./components/board/Edit";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<Board />} />
      <Route path="/login" element={<Login />} />
      <Route path="/board/write" element={<Write />} />
      <Route path="/board/:idx" element={<Post />} />
      <Route path="/board/edit/:idx" element={<Edit />} />
      <Route
        path="/about"
        element={
          <section>
            <div className="titleContainer">
              <div className="title">About page</div>
            </div>
          </section>
        }
      />
    </Routes>
  );
}

export default AppRouter;
