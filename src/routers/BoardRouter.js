import { Routes, Route, Router } from "react-router-dom";
import Board from "../components/board/Board";
import Write from "../components/board/Write";
import Post from "../components/board/Read";
import Edit from "../components/board/Edit";

export default function BoardRouter() {
  return (
    <Routes>
      <Route path="/board" element={<Board />} />
      <Route path="/board/:idx" element={<Post />} />
      <Route path="/board/edit/:idx" element={<Edit />} />
      <Route path="/board/write" element={<Write />} />
    </Routes>
  );
}
