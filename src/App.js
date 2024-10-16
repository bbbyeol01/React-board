import React from "react";
import AppRouter from "./routers/Router";
import BoardRouter from "./routers/BoardRouter";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <AppRouter />
        <BoardRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
